import ts, { isOptionalTypeNode } from 'typescript';
import { readFile, writeFile } from 'fs/promises';

const filePath = './res/docs.json';
const json = await readFile(filePath);
const decoder = new TextDecoder('utf-16le');
const docs = JSON.parse(decoder.decode(json)) as unknown;

if (!docs || !Array.isArray(docs)) {
  throw new Error(`Invalid docs file: ${filePath}`);
}

const file = ts.createSourceFile(
  'source.ts',
  '',
  ts.ScriptTarget.ESNext,
  false,
  ts.ScriptKind.TS
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

function getTSPropertyTypeFromValue(value: unknown): ts.TypeNode {
  if (value === null) {
    return ts.factory.createLiteralTypeNode(ts.factory.createNull());
  }
  if (typeof value === 'undefined') {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);
  }
  if (typeof value === 'boolean') {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
  }
  if (typeof value === 'number') {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
  }
  if (typeof value === 'string') {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  }
  if (typeof value === 'bigint') {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BigIntKeyword);
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return ts.factory.createArrayTypeNode(
        getTSPropertyTypeFromValue(value[0])
      );
    }
    return ts.factory.createTypeLiteralNode(
      Object.entries(value as Record<string, unknown>).map(([key, value]) => {
        return ts.factory.createPropertySignature(
          undefined,
          key,
          undefined,
          getTSPropertyTypeFromValue(value)
        );
      })
    );
  }
  throw new Error(`Unknown type: ${typeof value}`);
}

const nativeClassRegex = /FactoryGame\.(.*)'/; //Sample: ///Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'
const docsLength = docs.length;
const result: Map<
  string /*native class name*/,
  {
    fullProperties: Map<string, ts.TypeNode>;
    optionalProperties: Array<string>;
  }
> = new Map();

const globalCommonProperties: Map<string, ts.TypeNode> = new Map();

for (let i = 0; i < docsLength; i++) {
  const doc = docs[i];
  if (!doc || typeof doc !== 'object') {
    continue;
  }
  if (!('NativeClass' in doc) || typeof doc.NativeClass !== 'string') {
    continue;
  }
  if (!('Classes' in doc) || !Array.isArray(doc.Classes)) {
    continue;
  }
  const nativeClass = doc.NativeClass as string;
  const match = nativeClass.match(nativeClassRegex);
  if (!match) {
    continue;
  }
  const nativeClassName = match[1];
  const classes = doc.Classes as Record<string, unknown>[];
  const fullProperties: Map<string, ts.TypeNode> = new Map();
  const commonProperties: Map<string, ts.TypeNode> = new Map();
  console.log(`Parsing ${nativeClassName}, ${classes.length} classes`);
  for (let j = 0; j < classes.length; j++) {
    const classObj = classes[j];
    if (!classObj || typeof classObj !== 'object') {
      continue;
    }
    for (const [pName, value] of Object.entries(classObj)) {
      fullProperties.set(pName, getTSPropertyTypeFromValue(value));
    }

    if (j === 0) {
      for (const [pName, value] of Object.entries(classObj)) {
        commonProperties.set(pName, getTSPropertyTypeFromValue(value));
      }
    } else if (commonProperties.size > 0) {
      for (const [pName] of commonProperties.entries()) {
        if (!commonProperties.has(pName)) {
          commonProperties.delete(pName);
        }
      }
    }
  }

  const optionalProperties = Array.from(fullProperties.entries())
    .filter(([pName]) => !commonProperties.has(pName))
    .map(([pName]) => pName);

  result.set(nativeClassName, {
    fullProperties,
    optionalProperties,
  });

  console.log(
    'Common properties: ',
    commonProperties.size,
    optionalProperties.length
  );

  if (i === 0) {
    for (const [pName, type] of commonProperties.entries()) {
      globalCommonProperties.set(pName, type);
    }
  } else if (globalCommonProperties.size > 0) {
    for (const [pName] of globalCommonProperties.entries()) {
      if (!commonProperties.has(pName)) {
        globalCommonProperties.delete(pName);
      }
    }
  }
}

// Find inherited properties
const ordered = Array.from(result.entries()).sort(
  ([, { fullProperties: aProps }], [, { fullProperties: bProps }]) => {
    // Descending order by number of properties
    return bProps.size - aProps.size;
  }
);

console.log('Common properties: ', Array.from(globalCommonProperties.keys()));

ordered.push([
  'Generic',
  {
    fullProperties: globalCommonProperties,
    optionalProperties: [] as string[],
  },
]);

const interfaces: ts.InterfaceDeclaration[] = [];
const classNames: string[] = [];
for (let i = 0; i < ordered.length; i++) {
  const [
    className,
    { fullProperties: properties, optionalProperties: optional },
  ] = ordered[i];

  const inheritedProperties = new Set<string>();
  let j = i + 1;
  for (; j < ordered.length; j++) {
    inheritedProperties.clear();
    const [otherClassName, { fullProperties: otherProperties }] = ordered[j];
    if (otherClassName === className) {
      continue;
    }
    for (const [key] of properties.entries()) {
      if (otherProperties.has(key)) {
        inheritedProperties.add(key);
      }
    }
    if (inheritedProperties.size === otherProperties.size) {
      break;
    }
  }
  interfaces.unshift(
    ts.factory.createInterfaceDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      className + '_Class',
      undefined,
      inheritedProperties.size > 0 && j < ordered.length
        ? [
            ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
              ts.factory.createExpressionWithTypeArguments(
                ts.factory.createIdentifier(ordered[j][0] + '_Class'),
                undefined
              ),
            ]),
          ]
        : undefined,
      Array.from(properties.entries())
        .filter(([pName]) => !inheritedProperties.has(pName))
        .map(([pName, type]) => {
          return ts.factory.createPropertySignature(
            undefined,
            `'${pName}'`,
            optional.includes(pName)
              ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
              : undefined,
            type
          );
        })
    ),
    ts.factory.createInterfaceDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      className + '_Parent',
      undefined,
      undefined,
      [
        ts.factory.createPropertySignature(
          undefined,
          'NativeClass',
          undefined,
          ts.factory.createLiteralTypeNode(
            ts.factory.createStringLiteral(
              `/Script/CoreUObject.Class'/Script/FactoryGame.${className}'`
            )
          )
        ),
        ts.factory.createPropertySignature(
          undefined,
          'Classes',
          undefined,
          ts.factory.createArrayTypeNode(
            ts.factory.createTypeReferenceNode(className + '_Class', undefined)
          )
        ),
      ]
    )
  );

  classNames.push(className + '_Parent');
}

const code =
  printer.printList(
    ts.ListFormat.MultiLine,
    ts.factory.createNodeArray(interfaces),
    file
  ) +
  '\n\n' +
  printer.printNode(
    ts.EmitHint.Unspecified,
    ts.factory.createTypeAliasDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      'Docs',
      undefined,
      ts.factory.createArrayTypeNode(
        ts.factory.createUnionTypeNode(
          classNames.map(name =>
            ts.factory.createLiteralTypeNode(
              ts.factory.createStringLiteral(name)
            )
          )
        )
      )
    ),
    file
  ) +
  '\n\n' +
  printer.printNode(
    ts.EmitHint.Unspecified,
    ts.factory.createExportDefault(ts.factory.createIdentifier('Docs')),
    file
  );

await writeFile('./src/generated/docs.ts', code);
