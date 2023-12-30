/*
Parsing of Satisfactory File
*/
import UnrealDataReader from "./unrealDataReader.js";
import * as StructReaders from "./stuctParser.js";
import { unzlibSync } from "fflate";

const UnrealArchiveMagic = 0x9e2a83c1;
interface SatisfactorySaveHeader {
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

class SatisfactoryFileParser extends UnrealDataReader {
  parsedHeader: SatisfactorySaveHeader | null = null;

  parseSaveHeader() {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    // Retrieve from C:\Program Files (x86)\Steam\steamapps\common\Satisfactory\CommunityResources\Headers\FGSaveManagerInterface.h#L45
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

    this.parsedHeader = header;
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

  *inflateChunks() {
    if (!this.buffer) {
      throw new Error("Save file not imported");
    }
    let totalSize = 0;
    let count = 0;
    const infaltedDatas: Uint8Array[] = [];
    const offsets: number[] = [];
    while (this.currentOffset < this.buffer.byteLength) {
      yield { status: "inflating", totalSize, count };
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

  parseObjectToc() {
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
      //Actor
      // res/headers/FGActorSaveHeaderTypes.h:90
      const needTransform = this.readBool();
      // Ordering are unconfirmed
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
      const data = {
        type,
        className,
        reference,
        needTransform,
        transform,
        wasPlacedInLevel,
      };
      return data as typeof data & {
        parent: {
          levelName: string;
          pathName: string;
        };
        children: {
          levelName: string;
          pathName: string;
        }[];
      };
    } else {
      console.warn("Unknown object type", type);
      return {
        type,
        className,
        reference,
      };
    }
  }

  PropertyTypeReader = {
    Byte: "readChar",
    Int8: "readChar",
    Int: "readInt32",
    Int64: "readInt64",
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

  /**
   * Read a property. For DataBlob64 as well as innerType of Array, Set, Map
   * @param nested
   * @param incOffset
   * @returns
   */
  readProperty(incOffset = true) {
    // return key value pair [tag, value]
    const startOffset = this.currentOffset;
    const tag = this.readPropertyTag(incOffset);
    console.log(`Reading Property @ ${startOffset.toString(16)}`, tag);
    this.debugLog(4);

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
    */

    if (tag.type === "Bool") {
      return [tag, tag.boolValue!] as const;
    }
    // Basic types
    else if (Object.keys(this.PropertyTypeReader).includes(tag.type)) {
      const parserName = this.PropertyTypeReader[tag.type as keyof typeof this.PropertyTypeReader];
      const value = this[parserName](incOffset);
      return [tag, value] as const;
    }
    // Nested types
    else if (tag.type === "Array" || tag.type === "Set") {
      /*
        Possible inner types:
          Generated using: grep -aoP "(Array|Set)Property(.|\n|\r){13}\w*Property" outputs/inflated.bin | grep -aoP "\w*Property$" | sort | uniq
          
          ByteProperty, Int64Property, IntProperty, InterfaceProperty
          ObjectProperty, StrProperty, StructProperty, UInt32Property
          
          All except StructProperty are basic types and can be parsed using PropertyTypeReader
        */
      const count = this.readInt32(incOffset);
      const values: unknown[] = [];
      if (Object.keys(this.PropertyTypeReader).includes(tag.type)) {
        const parserName = this.PropertyTypeReader[tag.type as keyof typeof this.PropertyTypeReader];
        for (let i = 0; i < count; i++) {
          values.push(this[parserName](incOffset));
        }
      } else if (tag.innerType === "Struct") {
        const innerTag = this.readPropertyTag(incOffset)!;

        if (!innerTag.structName) {
          throw new Error(`Unable to parse Struct inner type: ${innerTag.innerType}`);
        }
        let parser: (reader: SatisfactoryFileParser) => unknown;
        if ("read" + innerTag.structName in StructReaders) {
          // @ts-ignore
          parser = StructReaders["read" + innerTag.structName];
        } else {
          // Parse as generic struct
          parser = () => this.readProperties(incOffset);
        }

        for (let i = 0; i < count; i++) {
          values.push(parser.call(this, this));
        }
      } else {
        throw new Error(`Unable to parse Array/Set inner type: ${tag.innerType}`);
      }
      return [tag, values] as const;
    } else if (tag.type === "Struct") {
      if (!tag.structName) {
        throw new Error(`Unable to parse Struct: ${tag.type}`);
      }
      if ("read" + tag.structName in StructReaders) {
        // @ts-ignore
        return [tag, StructReaders["read" + tag.structName].call(this, this)] as const;
      } else {
        // Parse as generic struct
        return [tag, this.readProperties(incOffset)] as const;
      }
    } else if (tag.type === "Map") {
      // Idk how to parse this yet
      console.log("MapType", tag);
      this.debugLog(16);
      throw new Error(`Map type not implemented: ${tag.type}`);
    } else {
      throw new Error(`Unknown property type: ${tag.type}`);
    }

    // Old code
    // } else if (['ByteProperty', 'Int8Property'].includes(tag.type)) {
    //   const value = this.readChar(incOffset);
    //   return nested ? value : [tag, value];
    // } else if (tag.type === "IntProperty") {
    //   const value = this.readInt32(incOffset);
    //   return nested ? value : [tag, value];
    // } else if (tag.type === "Int64Property") {
    //   const value = this.readInt64(incOffset);
    //   return nested ? value : [tag, value];
    // } else if (tag.type === "UInt32Property") {
    //   const value = this.readUInt32(incOffset);
    //   return nested ? value : [tag, value];
    // } else if (tag.type === "EnumProperty") {
    //   const value = this.readFString(incOffset);
    //   return nested ? value : [tag, value];
    // } else if (tag.type === "FloatProperty") {
    //   const value = this.readFloat(incOffset);
    //   return nested ? value : [tag, value];
    // } else if (tag.type === "DoubleProperty") {
    //   const value = this.readDouble(incOffset);
    //   return nested ? value : [tag, value];
    // }

    // Header
    // https://github.com/EpicGames/UnrealEngine/blob/02dc8dbdd89f749cd5500376e9bb87271bf64848/Engine/Source/Runtime/CoreUObject/Public/UObject/UnrealType.h#L219
    // Parse Properties
    // https://github.com/EpicGames/UnrealEngine/blob/02dc8dbdd89f749cd5500376e9bb87271bf64848/Engine/Source/Runtime/CoreUObject/Private/UObject/Property.cpp#L769
  }

  readProperties(incOffset = true) {
    const properties: Record<string, unknown> = {};
    while (true) {
      try {
        const prop = this.readProperty(incOffset);
        if (prop === null) break; // End of properties
        const [tag, value] = prop;
        console.log("Property Read finished @", this.currentOffset.toString(16), value);
        properties[tag.name] = value;
      } catch (e) {
        console.error("Error parsing property", {
          offset: this.currentOffset.toString(16),
          error: e,
        });
        throw e;
      }
    }
    console.log("Properties Read", properties, this.currentOffset.toString(16));
    return properties;
  }

  parseObjectData(toc: ReturnType<typeof this.parseObjectToc>) {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }

    const version = this.readInt32();
    if (version < 42) {
      throw new Error(`Unable to parse object data: version (${version}) < 42`);
    }
    this.currentOffset += 4; // Skip unknown
    const size = this.readInt32();
    const expectedEndOffset = this.currentOffset + size;

    interface ParentChildrenData {
      parent?: ReturnType<(typeof SatisfactoryFileParser)["prototype"]["readObjectReference"]>;
      children?: ReturnType<(typeof SatisfactoryFileParser)["prototype"]["readObjectReference"]>[];
    }

    const pcInfo: ParentChildrenData = {};
    if (toc.type === 1) {
      // Actor has additional data
      pcInfo.parent = this.readObjectReference();
      pcInfo.children = [];
      const childrenCount = this.readInt32();
      for (let i = 0; i < childrenCount; i++) {
        pcInfo.children.push(this.readObjectReference());
      }
    }

    const properties = this.readProperties();

    if (this.currentOffset !== expectedEndOffset) {
      console.warn("Warning: Object data doesn't end where expected, Jumping to end", {
        current: this.currentOffset.toString(16),
        expects: expectedEndOffset.toString(16),
        diff: expectedEndOffset - this.currentOffset,
      });
      this.currentOffset = expectedEndOffset; //Jump to end of object data to continue parsing
    }

    return {
      pcInfo,
      properties,
    };
  }

  parsePerStreamingLevelSaveData(key: string) {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }
    /*
      FPerStreamingLevelSaveData = FPerBasicLevelSaveData = { 
        TArray<uint8, TSizedDefaultAllocator<64>> TOCBlob64c (Table of Content)
        TArray<uint8, TSizedDefaultAllocator<64>> DataBlob64
      }
    */
    //TOCBlob64c
    const tocLength = this.readUInt64();
    const tocOffset = this.currentOffset;
    const tocExpectEndOffset = tocOffset + Number(tocLength);

    const objectCount = this.readInt32();
    const objects: ReturnType<typeof this.parseObjectToc>[] = [];
    for (let i = 0; i < objectCount; i++) {
      objects.push(this.parseObjectToc());
    }

    const TOCBlob64c: {
      objects: typeof objects;
      destroyedActors?: ReturnType<(typeof SatisfactoryFileParser)["prototype"]["readObjectReference"]>[];
    } = {
      objects,
    };

    if (this.currentOffset < tocExpectEndOffset) {
      //There is destroyed actors and we need to parse them

      const destroyedActorCount = this.readInt32();
      const destroyedActors: ReturnType<typeof this.readObjectReference>[] = [];

      for (let i = 0; i < destroyedActorCount; i++) {
        destroyedActors.push(this.readObjectReference());
      }
      TOCBlob64c.destroyedActors = destroyedActors;
    } else {
      console.log("TOC ended without destroyed actors");
    }

    if (this.currentOffset !== tocExpectEndOffset) {
      console.warn("Warning: TOC doesn't end where expected", {
        current: this.currentOffset.toString(16),
        expects: tocExpectEndOffset.toString(16),
        hasDestroyedActors: TOCBlob64c.destroyedActors !== undefined,
      });
      this.currentOffset = tocExpectEndOffset;
    }

    // If Empty Skip DataBlob64
    if (TOCBlob64c.objects.length === 0 && (!TOCBlob64c.destroyedActors || TOCBlob64c.destroyedActors.length === 0)) {
      this.currentOffset += 16; // objectDataSize (8) + objectDataCount (4) + destroyedActorDataCount (4)
      return {};
    }

    // Used to store data, group by class name
    const assembleData = new Map<string, Array<ReturnType<typeof this.parseObjectData>>>();

    //DataBlob64
    // - Object Data
    const objectDataSize = this.readUInt64();
    const objectDataEndOffset = this.currentOffset + Number(objectDataSize);
    const objectData = this.buffer.slice(this.currentOffset, objectDataEndOffset);
    const objectDataFrom = this.currentOffset.toString(16);
    const objectDataTo = objectDataEndOffset.toString(16);

    const objectDataCount = this.readInt32();

    if (objectDataCount !== objectCount) {
      console.warn("Warning: Data count doesn't match object count", {
        objectDataCount,
        objectCount,
      });
    }

    for (let i = 0; i < objectDataCount; i++) {
      const object = objects[i];
      try {
        const data = this.parseObjectData(object);
        const className = object.className;
        if (!assembleData.has(className)) {
          assembleData.set(className, []);
        }
        assembleData.get(className)?.push(data);
      } catch (e) {
        console.error("Error parsing object data", {
          object,
          index: i,
          objectDataFrom,
          objectDataTo,
          error: e,
        });
        throw e;
      }
    }
    if (this.currentOffset !== objectDataEndOffset) {
      console.warn("Warning: Object data doesn't end where expected, Jumping to end", {
        current: this.currentOffset.toString(16),
        expects: objectDataEndOffset.toString(16),
        diff: objectDataEndOffset - this.currentOffset,
      });

      this.currentOffset = objectDataEndOffset; //Jump to end of object data to continue parsing
    }

    // - Destroyed Actor Data
    const destroyedActorDataCount = this.readInt32();
    if (destroyedActorDataCount !== 0) {
      if (TOCBlob64c.destroyedActors) {
        if (destroyedActorDataCount !== TOCBlob64c.destroyedActors.length) {
          console.warn("Warning: Data count doesn't match destroyed actor count", {
            destroyedActorDataCount,
            destroyedActorCount: TOCBlob64c.destroyedActors.length,
          });
        }
      } else {
        console.warn("Warning: DataBlob has destroyed actor data but TOC doesn't", {
          destroyedActorDataCount,
          key,
        });
      }

      for (let i = 0; i < destroyedActorDataCount; i++) {
        this.readObjectReference();
        // Not sure what to do with this
      }
    }

    console.log("Data", assembleData);

    return {
      assembleData,
    };
  }

  parseSaveBody() {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }
    const bodySize = this.readInt64();

    /* 
      The following validation grid is not usefull to us but its still parsed

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
        const data = this.parsePerStreamingLevelSaveData(k);
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

    console.log("Per Level Data Map Info", { count: perLevelDataMap.size });

    /* Comment if need to store
    import("fs/promises").then(async ({ writeFile, mkdir }) => {
      await mkdir("outputs").catch(() => {});
      await writeFile("outputs/perLevelDataMap.json", JSON.stringify(Object.fromEntries(perLevelDataMap), null, 2));
    });
    //*/

    const persistentAndRuntimeData = this.parsePerStreamingLevelSaveData("Persistent_Level");

    console.log("Persistent And Runtime Data Info", {});

    /* Comment if need to store
    import("fs/promises").then(async ({ writeFile, mkdir }) => {
      await mkdir("outputs").catch(() => {});
      await writeFile("outputs/persistentAndRuntimeData.json", JSON.stringify(persistentAndRuntimeData, null, 2));
    });
    //*/

    return { bodySize };
  }

  async *importFromFile(filename: string) {
    yield { status: "importing" };
    const { readFile } = await import("fs/promises");
    const { buffer } = await readFile(filename);
    yield { status: "read", length: buffer.byteLength };
    this.buffer = new Uint8Array(buffer);
    this.dataView = new DataView(buffer);
  }

  async *parseSave() {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }
    this.currentOffset = 0;
    const headers = this.parseSaveHeader();

    yield {
      status: "parsedHeader",
      headers: headers,
    };

    const inflateProgress = this.inflateChunks();

    for (const progress of inflateProgress) {
      yield {
        status: "inflating chunks",
        progress,
      };
    }

    yield {
      status: "inflated",
      length: this.buffer.byteLength,
    };

    // /* Comment this line (only) to output the inflated save file
    const { writeFile, mkdir } = await import("fs/promises");
    await mkdir("outputs").catch(() => {});
    await writeFile("outputs/inflated.bin", this.buffer);
    //*/

    const body = this.parseSaveBody();

    yield {
      status: "parsedBody",
      body,
    };
  }
}

const parser = new SatisfactoryFileParser();
let statuses = parser.importFromFile("save_files/satisfactory.sav");
for await (const status of statuses) console.log("Importing: ", status);
statuses = parser.parseSave();
for await (const status of statuses) console.log("Parsing: ", status);
