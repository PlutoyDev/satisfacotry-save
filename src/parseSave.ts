/*
Parsing of Satisfactory File
*/
import UnrealDataReader from "./unrealDataReader.js";
import type { ObjectReference } from "./unrealDataReader.js";
import * as StructReaders from "./stuctReader.js";
import { unzlibSync } from "fflate";
import { readFile, writeFile, mkdir } from "fs/promises";

const UnrealArchiveMagic = 0x9e2a83c1;
interface SatisfactorySaveHeader {
  // res/headers/FGSaveManagerInterface.h:45
  // int32    SaveHeaderVersion
  // int32    SaveVersion
  // int32    BuildVersion
  // FString  MapName
  // FString  MapOptions
  // FString  SessionName
  // int32    PlayDurationSeconds
  // int64    SaveDateTime
  // int8     SessionVisibility
  // int32    EditorObjectVersion
  // FString  ModMetadata
  // bool     IsModdedSave
  // FString  SaveIdentifier
  // bool     IsPartitionedWorld
  // FMD5Hash SaveDataHash
  // bool     IsCreativeModeEnabled

  saveHeaderVersion: number;
  saveVersion: number;
  buildVersion: number;
  mapName: string;
  mapOptions: string;
  sessionName: string;
  playDurationSeconds: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  saveDateTime: Date;
  sessionVisibility: number;
  editorObjectVersion: number;
  modMetadata: string;
  isModdedSave: boolean;
  saveIdentifier: string;
  isPartitionedWorld: boolean;
  saveDataHash: {
    isValid: boolean;
    hash: string;
  };
  isCreativeModeEnabled: boolean;
}

interface SatisfactoryFileReaderOptions {
  toOutput?: {
    all?: boolean;
    header?: boolean;
    inflatedBin?: boolean;
    perLevelDataMap?: boolean;
    persistentAndRuntimeData?: boolean;
  };
}

export class SatisfactoryFileReader extends UnrealDataReader {
  header: SatisfactorySaveHeader | null = null;
  nestingLevel = 0;
  options: SatisfactoryFileReaderOptions = {};
  outputPrefix: string;
  readPr: Promise<void>;
  writePrs: Promise<void>[] = [];

  constructor(saveFilePath: string, options?: SatisfactoryFileReaderOptions) {
    super();
    this.options = options || {};
    this.readPr = readFile(saveFilePath).then(({ buffer }) => {
      this.buffer = new Uint8Array(buffer);
      this.dataView = new DataView(buffer);
    });
    this.outputPrefix = "outputs/" + saveFilePath.split("/").pop()!.split(".").shift()! + "/";
    if (this.options.toOutput && Object.values(this.options.toOutput).some((v) => v)) {
      if (this.options.toOutput.all || this.options.toOutput.persistentAndRuntimeData) {
        mkdir(this.outputPrefix + "persistentAndRuntimeData", { recursive: true }).catch(() => {});
      } else {
        mkdir(this.outputPrefix, { recursive: true }).catch(() => {});
      }
    }
  }

  readSaveHeader() {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }

    const saveHeaderVersion = this.readInt32();
    const saveVersion = this.readInt32();
    const buildVersion = this.readInt32();
    const mapName = this.readFString();
    const mapOptions = this.readFString();
    const sessionName = this.readFString();
    const playDurationSeconds = this.readDuration();
    const saveDateTime = this.readFDateTime();
    const sessionVisibility = this.readChar();
    const editorObjectVersion = this.readInt32();
    const modMetadata = this.readFString();
    const isModdedSave = this.readBool();
    const saveIdentifier = this.readFString();
    const isPartitionedWorld = this.readBool();
    const saveDataHash = this.readFMD5Hash();
    const isCreativeModeEnabled = this.readBool();

    const header = {
      saveHeaderVersion,
      saveVersion,
      buildVersion,
      mapName,
      mapOptions,
      sessionName,
      playDurationSeconds,
      saveDateTime,
      sessionVisibility,
      editorObjectVersion,
      modMetadata,
      isModdedSave,
      saveIdentifier,
      isPartitionedWorld,
      saveDataHash,
      isCreativeModeEnabled,
    };

    this.header = header;
    return header;
  }

  inflateChunk() {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }
    const magicNumber = this.readUInt32();
    if (magicNumber !== UnrealArchiveMagic) {
      throw new Error("Invalid magic number");
    }
    const version = this.readUInt32();
    if (version !== 0x22222222) {
      throw new Error("Invalid header");
    }

    this.currentOffset += 8 + 1 + 8 + 8;
    const compressedSize = Number(this.readInt64());
    const uncompressedSize = Number(this.readInt64());
    const infaltedData = new Uint8Array(uncompressedSize);
    unzlibSync(this.buffer.slice(this.currentOffset, this.currentOffset + compressedSize), { out: infaltedData });

    this.currentOffset += compressedSize;

    return {
      size: uncompressedSize,
      infaltedData,
    };
  }

  inflateChunks() {
    if (!this.buffer) {
      throw new Error("Save file not imported");
    }
    let totalSize = 0;
    let count = 0;
    const infaltedDatas: Uint8Array[] = [];
    const offsets: number[] = [];
    while (this.currentOffset < this.buffer.byteLength) {
      const { size, infaltedData } = this.inflateChunk();
      infaltedDatas.push(infaltedData);
      offsets.push(totalSize);
      totalSize += size;
      count += 1;
    }

    delete this.buffer;
    delete this.dataView;

    this.buffer = new Uint8Array(totalSize);
    for (let i = 0; i < count; i++) {
      const data = infaltedDatas[i];
      const offset = offsets[i];
      this.buffer.set(data, offset);
    }

    this.dataView = new DataView(this.buffer.buffer);
    this.currentOffset = 0;
  }

  readObjectToc() {
    // res/headers/FGActorSaveHeaderTypes.h:7
    const type = this.readInt32();
    const className = this.readFString();
    const reference = this.readObjectReference();
    if (type === 0) {
      // Object
      // res/headers/FGActorSaveHeaderTypes.h:55
      const outerPathName = this.readFString();
      return { type, className, reference, outerPathName };
    } else if (type === 1) {
      // Actor
      // res/headers/FGActorSaveHeaderTypes.h:90
      const needTransform = this.readBool();

      const transform = {
        rotation: {
          x: this.readFloat(),
          y: this.readFloat(),
          z: this.readFloat(),
          w: this.readFloat(),
        },
        translation: {
          x: this.readFloat(),
          y: this.readFloat(),
          z: this.readFloat(),
        },
        scale: {
          x: this.readFloat(),
          y: this.readFloat(),
          z: this.readFloat(),
        },
      };
      const wasPlacedInLevel = this.readBool();
      return {
        type,
        className,
        reference,
        needTransform,
        transform,
        wasPlacedInLevel,
      };
    }
    throw new Error(`Unknown Object Type ${type}`);
  }

  PropertyTypeReader = {
    Int8: "readInt8",
    Int: "readInt32",
    Int64: "readInt64AsNumber",
    UInt32: "readUInt32",
    Enum: "readFString",
    Float: "readFloat",
    Double: "readDouble",
    Str: "readFString",
    Name: "readFString",
    Text: "readFText",
    Object: "readObjectReference",
    Interface: "readObjectReference",
  } satisfies Record<string, keyof UnrealDataReader>;

  getTypeReader(tag: Exclude<ReturnType<typeof SatisfactoryFileReader.prototype.readPropertyTag>, null>) {
    const valueType = tag.valueType ?? tag.innerType ?? tag.type; // valueType for Map, innerType is only for Array, Set
    let typeReader: ((this: SatisfactoryFileReader) => any) | undefined = undefined;
    if (Object.keys(this.PropertyTypeReader).includes(valueType)) {
      const readerName = this.PropertyTypeReader[valueType as keyof typeof this.PropertyTypeReader];
      typeReader = this[readerName];
    } else if (valueType === "Byte") {
      // Not sure why the type is Byte but the value is stored as String
      typeReader = !tag.enumName || tag.enumName === "None" ? this.readChar : this.readFString;
    } else if (valueType === "Struct") {
      let innerTag: ReturnType<typeof SatisfactoryFileReader.prototype.readPropertyTag> | undefined = undefined;
      let structName: string | undefined = tag.structName;
      if (tag.type === "Array" || tag.type === "Set") {
        innerTag = this.readPropertyTag()!;
        if (innerTag.type !== "Struct") {
          throw new Error(`Expected Struct but got ${innerTag.type}`);
        }
        structName = innerTag.structName;
      } else if (tag.type === "Map") {
        // Special case for MapProperty, struct in map doesn't have structName
        // Instead, it store it as TLVs that can be read using readProperties
        // Except 2 case: where tag.name are mSaveData, mUnresolvedSaveData
        // Both use FIntVector as key but doesn't have field names
        if ((tag.name === "mSaveData" || tag.name === "mUnresolvedSaveData") && !tag.valueType) {
          // If tag.valueType is undefined, the valueType the Key
          structName = "IntVector";
        }
      }
      // @ts-ignore
      typeReader = (structName && StructReaders["read" + structName]) || this.readProperties;
    }

    if (!typeReader) {
      console.log("Unknown property type", tag);
      throw new Error("Unknown property type");
    }

    if (tag.type === "Map" && tag.valueType) {
      // delete tag.valueType;
      const keyReader = this.getTypeReader({ ...tag, valueType: undefined });
      // tag.valueType = valueType;
      return function (this: SatisfactoryFileReader): [unknown, unknown] {
        return [keyReader.call(this), typeReader!.call(this)];
      };
    }

    return typeReader;
  }

  /**
   * Read a property. For DataBlob64 as well as innerType of Array, Set, Map
   * @param nested
   * @param incOffset
   * @returns
   */
  readProperty() {
    // return key value pair [tag, value]
    // const startOffset = this.currentOffset;
    // console.log(`Reading Property @ ${startOffset.toString(16)}`);
    const tag = this.readPropertyTag();
    // console.log({ readUntil: this.currentOffset.toString(16), tag });

    if (tag === null) {
      return null;
    }

    /* 
      Possible Type:
        BoolProperty, ByteProperty, Int8Property, IntProperty
        Int64Property, UInt32Property, EnumProperty, FloatProperty
        DoubleProperty, StrProperty, NameProperty, ObjectProperty
        InterfaceProperty, ArrayProperty, SetProperty, StructProperty
        MapProperty, TextProperty
      Generated using: strings outputs/inflated.bin -n 4 | grep -xe "\w*Property" | sort | uniq

      Array/Set Inner Type:
        ByteProperty, Int64Property, IntProperty, InterfaceProperty
        ObjectProperty, StrProperty, StructProperty, UInt32Property
      Generated using: grep -aoP "(Array|Set)Property(.|\n|\r){13}\w*Property" outputs/inflated.bin | grep -aoP "\w*Property$" | sort | uniq
    */

    if (tag.type === "Bool") {
      return [tag, tag.boolValue!] as const;
    }

    let count: number | undefined = undefined;
    if (tag.type === "Array" || tag.type === "Set" || tag.type === "Map") {
      if (tag.type === "Set" || tag.type === "Map") this.currentOffset += 4; // Skip unknown (Set has 1 extra int in front of count, that is 0)
      count = this.readInt32();
    }

    const valueReader = this.getTypeReader(tag);

    if (tag.type === "Array" || tag.type === "Set" || tag.type === "Map") {
      const values: unknown[] = [];
      for (let i = 0; i < count!; i++) {
        values.push(valueReader.call(this));
      }
      return [tag, values] as const;
    } else {
      return [tag, valueReader.call(this)] as const;
    }

    throw new Error("Unreachable code");
  }

  readProperties() {
    // Nesting level: 1 is the object properties, >=2 is struct properties
    this.nestingLevel += 1;
    const properties: Record<string, unknown> = {};
    while (true) {
      try {
        const prop = this.readProperty();
        if (prop === null) {
          // End of properties
          // But for object properties, there might have an extra Int 0
          if (this.nestingLevel === 1) {
            if (this.readInt32() !== 0) {
              this.currentOffset -= 4;
            }
          }
          break;
        }
        const [tag, value] = prop;
        // console.log("Property Read finished @", this.currentOffset.toString(16), value);
        properties[tag.name] = value;
      } catch (e) {
        console.error("Error parsing property", {
          offset: this.currentOffset.toString(16),
          error: e,
        });
        throw e;
      }
    }
    this.nestingLevel -= 1;
    // console.log("Properties Read", properties, this.currentOffset.toString(16));
    return properties;
  }

  readObjectData(toc: ReturnType<typeof this.readObjectToc>) {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }

    const version = this.readInt32();
    if (version < 42) {
      throw new Error(`Unable to read object data: version (${version}) < 42`);
    }
    this.currentOffset += 4; // Skip unknown
    const size = this.readInt32();
    const expectedEndOffset = this.currentOffset + size;

    interface ParentChildrenData {
      parent?: ObjectReference;
      children?: ObjectReference[];
    }

    const pcInfo: ParentChildrenData = {};
    if (toc.type === 1) {
      // Actor has additional data
      pcInfo.parent = this.readObjectReference();
      pcInfo.children = this.readTArray(() => this.readObjectReference());
    }

    const properties = this.readProperties();
    let extraDataBase64: string | undefined = undefined;
    if (this.currentOffset !== expectedEndOffset) {
      if (this.currentOffset < expectedEndOffset) {
        const extraData = this.buffer.slice(this.currentOffset, expectedEndOffset);
        // if non-zero, convert to base64 and store
        if (extraData.every((v) => v !== 0)) {
          extraDataBase64 = Buffer.from(extraData).toString("base64");
        }
        this.currentOffset = expectedEndOffset;
      } else {
        throw new Error("Object data ended after expected");
      }
    }

    return {
      pcInfo,
      properties,
      extraDataBase64,
    };
  }

  readLevelData(key: string, readObjectData = true) {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }
    type ObjectType =
      | ReturnType<typeof this.readObjectToc>
      | (ReturnType<typeof this.readObjectToc> & ReturnType<typeof this.readObjectData>);
    type DestroyedActorType = ReturnType<typeof this.readObjectReference>;
    interface LevelData {
      objects: ObjectType[];
      destroyedActors: {
        inTOC?: DestroyedActorType[];
        afterData?: DestroyedActorType[] | [string, DestroyedActorType[]][];
      };
    }

    /*
      FPerStreamingLevelSaveData = FPerBasicLevelSaveData = { 
        TArray<uint8, TSizedDefaultAllocator<64>> TOCBlob64c (Table of Content)
        TArray<uint8, TSizedDefaultAllocator<64>> DataBlob64
        TArray<struct FObjectReferenceDisc> DestroyedActors
      }
    */
    //TOCBlob64c
    const tocLength = this.readUInt64();
    const tocOffset = this.currentOffset;
    const tocExpectEndOffset = tocOffset + Number(tocLength);

    const levelData: LevelData = {
      objects: this.readTArray(() => this.readObjectToc()),
      destroyedActors: {},
    };

    if (this.currentOffset < tocExpectEndOffset) {
      //There is destroyed actors and we need to read them
      levelData.destroyedActors.inTOC = this.readTArray(() => this.readObjectReference());
    }

    if (this.currentOffset !== tocExpectEndOffset) {
      console.warn("Warning: TOC doesn't end where expected", {
        current: this.currentOffset.toString(16),
        expects: tocExpectEndOffset.toString(16),
        hasDestroyedActors: levelData.destroyedActors !== undefined,
      });
      this.currentOffset = tocExpectEndOffset;
    }

    //DataBlob64
    // - Object Data
    const objectDataSize = this.readUInt64();
    const objectDataEndOffset = this.currentOffset + Number(objectDataSize);

    this.readTArray((i) => Object.assign(levelData.objects![i], this.readObjectData(levelData.objects![i])));

    if (this.currentOffset !== objectDataEndOffset) {
      if (readObjectData) {
        console.warn("Warning: Object data doesn't end where expected, Jumping to end", {
          current: this.currentOffset.toString(16),
          expects: objectDataEndOffset.toString(16),
          diff: objectDataEndOffset - this.currentOffset,
        });
      }

      this.currentOffset = objectDataEndOffset; //Jump to end of object data to continue parsing
    }

    if (key !== "Persistent_Level") {
      levelData.destroyedActors.afterData = this.readTArray(() => this.readObjectReference());
    } else {
      levelData.destroyedActors.afterData = this.readTArray(
        () => [this.readFString(), this.readTArray(() => this.readObjectReference())] as [string, DestroyedActorType[]],
      );
    }

    return levelData as {
      objects: SatisfactoryObject[];
      destroyedActors: {
        inTOC?: DestroyedActorType[];
        afterData?: DestroyedActorType[] | [string, DestroyedActorType[]][];
      };
    };
  }

  async readSaveBody() {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }
    const bodySize = this.readInt64();
    const bodyEndOffset = this.currentOffset + Number(bodySize);

    /* 
      The following validation grid is not usefull to us but its still read

      res/headers/FGWorldSettings.h:158
      FWorldPartitionValidationData SaveGameValidationData

      res/headers/FWPSaveDataMigrationContext.h:68
      FWorldPartitionValidationData { TMap<FName, FWPGridValidationData> Grids }

      res/headers/FWPSaveDataMigrationContext.h:42
      FWPGridValidationData { int32 cellSize, uint32 gridHash, TMap<FName, uint32> cellHash }
    */
    const validationGrids = //Uncomment if need to store
      this.readTMap(() => {
        const cellSize = this.readInt32();
        const gridHash = this.readUInt32();
        const cellHash = this.readTMap(() => this.readUInt32());
        return { cellSize, gridHash, cellHash };
      });
    /*
      res/headers/FGSaveSession.h:471

      Map with unique data for each level
      TMap<FName, FPerStreamingLevelSaveData> mPerLevelDataMap

      res/headers/FGSaveSession.h:50
      FPerStreamingLevelSaveData = FPerBasicLevelSaveData = { 
        TArray<uint8, TSizedDefaultAllocator<64>> TOCBlob64c (Table of Content)
        TArray<uint8, TSizedDefaultAllocator<64>> DataBlob64
      }
    */

    const perLevelDataMap = this.readTMap((k, i) => {
      const startOffset = this.currentOffset;
      try {
        const data = this.readLevelData(k);
        return data;
      } catch (e) {
        console.error("Error parsing per level data", {
          level: k,
          index: i,
          startOffset: startOffset.toString(16),
          error: e,
        });
        throw e;
      }
    });

    const persistentAndRuntimeData = this.readLevelData("Persistent_Level");
    const unresolvedDestoryedActors = this.readTArray(() => this.readObjectReference());

    if (this.currentOffset !== bodyEndOffset) {
      console.warn("Warning: Body doesn't end where expected", {
        current: this.currentOffset.toString(16),
        expects: bodyEndOffset.toString(16),
        diff: bodyEndOffset - this.currentOffset,
      });
    }

    return {
      validationGrids,
      perLevelDataMap,
      persistentAndRuntimeData,
      unresolvedDestoryedActors,
    };
  }

  async readSave() {
    await this.readPr;

    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }
    this.currentOffset = 0;
    const headers = this.readSaveHeader();

    if (this.options.toOutput?.all || this.options.toOutput?.header) {
      this.writePrs.push(writeFile(this.outputPrefix + "header.json", JSON.stringify(headers, null, 2)));
    }

    this.inflateChunks(); // Inflate and override this.buffer and this.dataView

    if (this.options.toOutput?.all || this.options.toOutput?.inflatedBin) {
      this.writePrs.push(writeFile(this.outputPrefix + "inflated.bin", this.buffer));
    }

    const body = await this.readSaveBody();

    if (this.options.toOutput?.all || this.options.toOutput?.perLevelDataMap) {
      this.writePrs.push(
        writeFile(
          this.outputPrefix + "perLevelDataMap.json",
          JSON.stringify(Object.fromEntries(body.perLevelDataMap), null, 2),
        ),
      );
    }

    if (this.options.toOutput?.all || this.options.toOutput?.persistentAndRuntimeData) {
      // Split the objects by classname
      const groupedObjects = new Map<string, Record<number, SatisfactoryObject>>();
      const pathsToCreate = new Set<string>();
      for (let i = 0; i < body.persistentAndRuntimeData.objects.length; i++) {
        const obj = body.persistentAndRuntimeData.objects[i];
        const className = obj.className;
        if (!groupedObjects.has(className)) {
          groupedObjects.set(className, {});
          pathsToCreate.add("persistentAndRuntimeData/" + className.split("/").slice(0, -1).join("/"));
        }
        groupedObjects.get(className)![i] = obj;
      }

      await Promise.all(
        Array.from(pathsToCreate).map((path) => mkdir(this.outputPrefix + path, { recursive: true }).catch(() => {})),
      );

      this.writePrs.push(
        ...Object.entries(Object.fromEntries(groupedObjects)).map(([className, objects]) =>
          writeFile(
            this.outputPrefix + "persistentAndRuntimeData/" + className + ".json",
            JSON.stringify(objects, null, 2),
          ),
        ),
      );
    }

    await Promise.all(this.writePrs);

    return {
      headers,
      body,
    };
  }
}

export default SatisfactoryFileReader;

import type { Vector, Quat } from "./stuctReader.js";

export type SatisfactoryObject<ClassName extends string = string, Properties = Record<string, unknown>> = {
  type: 0 | 1;
  className: ClassName;
  reference: ObjectReference;
  outerPathName?: string;
  needTransform?: boolean;
  transform?: {
    rotation: Quat;
    translation: Vector;
    scale: Vector;
  };
  wasPlacedInLevel?: boolean;
  pcInfo?: {
    parent?: ObjectReference;
    children?: ObjectReference[];
  };
  properties: Properties;
};
