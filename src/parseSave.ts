/*
Parsing of Satisfactory File
*/
import { unzlibSync } from "fflate";

const UnrealArchiveMagic = 0x9e2a83c1;

class CppDataReader {
  currentOffset = 0;
  dataView?: DataView;
  buffer?: Uint8Array;

  // Primitives types
  readChar(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    const value = this.dataView.getInt8(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 1;
    }
    return value;
  }

  readDouble(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    const value = this.dataView.getFloat64(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  readFloat(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    const value = this.dataView.getFloat32(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readUInt32(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    const value = this.dataView.getUint32(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readInt32(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    const value = this.dataView.getInt32(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readUInt64(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    const value = this.dataView.getBigUint64(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  readInt64(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }
    const value = this.dataView.getBigInt64(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  // For debuging
  debug(length = 1, as: "hex" | "bin", incOffset = false) {
    if (!this.buffer) {
      throw new Error("Save file not imported");
    }
    const value = this.buffer.slice(this.currentOffset, this.currentOffset + length);
    if (incOffset) {
      this.currentOffset += length;
    }
    if (as === "hex") {
      return [...value].map((value) => value.toString(16).padStart(2, "0")).join(" ");
    }
    if (as === "bin") {
      return [...value].map((value) => value.toString(2).padStart(8, "0")).join(" ");
    }
    return value;
  }

  debugLog(length = 4) {
    if (!this.buffer) {
      throw new Error("Save file not imported");
    }
    const atHex = this.currentOffset.toString(16);
    const atDec = this.currentOffset.toString(10);
    const valueArr = Array.from(this.buffer.slice(this.currentOffset, this.currentOffset + length));
    const hexValue = valueArr.map((value) => value.toString(16).padStart(2, "0")).join(" ");
    const decValue = valueArr.map((value) => value.toString(10).padStart(3, "0")).join(" ");
    console.table({
      hex: { at: atHex, value: hexValue },
      dec: { at: atDec, value: decValue },
    });
  }
}

class UnrealDataReader extends CppDataReader {
  readDuration(incOffset = true) {
    const totalSeconds = this.readInt32(incOffset);
    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  readBool(incOffset = true) {
    const value = this.readInt32(incOffset);
    return value === 1;
  }

  readFString(incOffset = true) {
    if (!this.buffer) {
      throw new Error("Save file not imported");
    }
    const length = this.readUInt32(incOffset);
    if (length === 0) {
      return "";
    }
    const value = new TextDecoder().decode(this.buffer.slice(this.currentOffset, this.currentOffset + length));
    if (incOffset) {
      this.currentOffset += length;
    }

    return value.substring(0, value.length - 1);
  }

  readFName(incOffset = true) {
    const index = this.readInt32(incOffset);
    const number = this.readInt32(incOffset);
    const value = this.readFString(incOffset);
    return { index, number, value };
  }

  readFMD5Hash(incOffset = true) {
    if (!this.dataView) {
      throw new Error("Save file not imported");
    }

    const isValid = this.readBool(incOffset);

    const v1 = this.readUInt64(incOffset);
    const v2 = this.readUInt64(incOffset);

    const hash = (v2 * 2n ** 64n + v1).toString(16).padStart(32, "0");
    return { isValid, hash };
  }

  readFText(incOffset = true) {
    const flags = this.readUInt32(incOffset);
    const historyType = this.readUInt32(incOffset);
    const historyCount = this.readUInt32(incOffset);
    const string = this.readFString(incOffset);
    const namespace = this.readFName(incOffset);
    return { flags, historyType, historyCount, string, namespace };
  }

  readObjectReference() {
    // res/headers/FGObjectReferencer.h:23
    const levelName = this.readFString();
    const pathName = this.readFString();
    return { levelName, pathName };
  }

  readFDateTime(incOffset = true) {
    // 100 nanoseconds since 1/1/0001
    const ticks = this.readInt64(incOffset);
    const milliseconds = ticks / 10000n;
    const epoch = Number(milliseconds - 62135596800000n);
    return new Date(epoch);
  }

  readFSoftObjectPath(incOffset = true) {
    const value = this.readFString(incOffset);
    return value;
  }

  readFGuid(incOffset = true) {
    const a = this.readUInt32(incOffset);
    const b = this.readUInt32(incOffset);
    const c = this.readUInt32(incOffset);
    const d = this.readUInt32(incOffset);
    return { a, b, c, d };
  }

  readTMap<V>(valueParser: (key: string, index: number) => V, limit: number | undefined = undefined, incOffset = true) {
    const length = this.readInt32(incOffset);
    const map: Map<string, V> = new Map();
    for (let i = 0; i < Math.min(length, limit ?? length); i++) {
      const key = this.readFString(incOffset);
      const value = valueParser(key, i);
      map.set(key, value);
    }
    return map;
  }

  readSimpleProperty = {
    ByteProperty: () => this.readChar(),
    Int8Property: () => this.readChar(),
    IntProperty: () => this.readInt32(),
    Int64Property: () => this.readInt64(),
    UInt32Property: () => this.readUInt32(),
    EnumProperty: () => this.readFString(),
    FloatProperty: () => this.readFloat(),
    DoubleProperty: () => this.readDouble(),
    StrProperty: () => this.readFString(),
    NameProperty: () => this.readFString(),
    ObjectProperty: () => this.readObjectReference(),
    InterfaceProperty: () => this.readObjectReference(),
    TextProperty: () => this.readFText(),
  };

  readProperty(nested?: { type: string; parentType: string }, incOffset = true) {
    // return key value pair [tag, value]

    // Translated from Unreal Source Code
    // https://github.com/EpicGames/UnrealEngine/blob/5.2.0-release/Engine/Source/Runtime/CoreUObject/Public/UObject/PropertyTag.h
    interface PropertyTag {
      name?: string; // Name/Key of property
      type: string; // Type of property
      size?: number; // Property size (default is 0)
      boolValue?: boolean; // a boolean property's value (default is false)
      structName?: string; // Struct name if FStructProperty.
      enumName?: string; // Enum name if FByteProperty or FEnumProperty
      innerType?: string; // Inner type if FArrayProperty, FSetProperty, or FMapProperty
      valueType?: string; // Value type if UMapPropery
      arrayIndex?: number; // Index if an array (default is 0)
      sizeOffset?: number; // location in stream of tag size member ?? (default is 0)
      structGuid?: ReturnType<typeof UnrealDataReader.prototype.readFGuid>;
      hasPropertyGuid?: boolean; // (default is false)
      propertyGuid?: ReturnType<typeof UnrealDataReader.prototype.readFGuid>;
    }

    const tag: PropertyTag = nested
      ? {
          type: nested.type,
        }
      : {
          name: this.readFString(incOffset),
          type: this.readFString(incOffset),
          size: this.readInt32(incOffset),
        };

    if (tag.type === "None" || tag.name === "None") {
      return null;
    }

    // Translated and adapted from Unreal Source Code
    // https://github.com/EpicGames/UnrealEngine/blob/407acc04a93f09ecb42c07c98b74fd00cc967100/Engine/Source/Runtime/CoreUObject/Private/UObject/PropertyTag.cpp#L16
    if (!nested) {
      tag.arrayIndex = this.readInt32(incOffset);
    }
    if (tag.type === "StructProperty") {
      tag.structName = this.readFString(incOffset);
      tag.structGuid = this.readFGuid(incOffset);
    } else if (tag.type === "BoolProperty") {
      tag.boolValue = this.readBool(incOffset);
    } else if (tag.type === "ByteProperty" || tag.type === "EnumProperty") {
      tag.enumName = this.readFString(incOffset);
    } else if (tag.type === "ArrayProperty" || tag.type === "SetProperty") {
      tag.innerType = this.readFString(incOffset);
    } else if (tag.type === "MapProperty") {
      tag.innerType = this.readFString(incOffset);
      tag.valueType = this.readFString(incOffset);
    }
    if (!nested) {
      tag.hasPropertyGuid = this.readBool(incOffset);
      if (tag.hasPropertyGuid) {
        tag.propertyGuid = this.readFGuid(incOffset);
      }
    }

    /* 
      Possible Type:
        BoolProperty
        ByteProperty
        Int8Property
        IntProperty
        Int64Property
        UInt32Property
        EnumProperty
        FloatProperty
        DoubleProperty
        StrProperty
        NameProperty
        StructProperty
        ObjectProperty
        InterfaceProperty
        ArrayProperty
        SetProperty
        MapProperty
        TextProperty
      Generated using: strings outputs/inflated.bin -n 4 | grep -xe "\w*Property" | sort | uniq > outputs/propertyTypes.txt
    */

    if (tag.type === "BoolProperty") {
      return nested ? tag.boolValue : [tag, tag.boolValue];
    } else if (Object.keys(this.readSimpleProperty).includes(tag.type)) {
      const value = this.readSimpleProperty[tag.type as keyof typeof this.readSimpleProperty]();
      return nested ? value : [tag, value];
    }
    // Nested types
    else if (tag.type === "ArrayProperty") {
      const count = this.readInt32(incOffset);
      const values: unknown[] = [];
      for (let i = 0; i < count; i++) {
        values.push(this.readProperty({ type: tag.innerType!, parentType: tag.type }, incOffset));
      }
      return nested ? values : [tag, values];
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

  // readProperties(incOffset = true) {
  //   const props = new Map<string, any>();
  //   while (true) {
  //     const name = this.readFString(incOffset);
  //     if (name === "none") return props;
  //     const type = this.readFString(incOffset);
  //   }
  // }
}

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

  parseObjectData(toc: ReturnType<typeof this.parseObjectToc>) {
    if (!this.dataView || !this.buffer) {
      throw new Error("Save file not imported");
    }

    const count = this.readInt32();
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
    const assembleData = new Map<string, Array<Record<string, unknown>>>();

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
      // const obj = objects[i];
      // const size = this.readInt32();
      // if (obj.type == 1 && 'needTransform' in obj) {
      //   // To make typescript happy but this is just to check if its actor
      //   // Actor
      //   obj.parent = this.parseObjectReference();
      //   const childrenCount = this.readInt32();
      //   obj.children = [];
      //   for (let i = 0; i < childrenCount; i++) {
      //     obj.children.push(this.parseObjectReference());
      //   }
      // }
      // Read Properties
      // const propperties = new Map<string, unknown>();
    }
    if (this.currentOffset !== objectDataEndOffset) {
      // console.warn("Warning: Object data doesn't end where expected, Jumping to end", {
      //   current: this.currentOffset.toString(16),
      //   expects: objectDataEndOffset.toString(16),
      //   diff: objectDataEndOffset - this.currentOffset,
      // });

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

    return {
      TOCBlob64c,
      DataBlob64: {
        objects: {
          size: Number(objectDataSize),
          count: objectDataCount,
          dataBase64: Buffer.from(objectData).toString("base64"), //For using with ChatGPT
          from: objectDataFrom,
          to: objectDataTo,
        },
      },
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
