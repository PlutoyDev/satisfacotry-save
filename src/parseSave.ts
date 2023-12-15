/*
Parsing of Satisfactory File
*/
import { unzlibSync } from 'fflate';

const UnrealArchiveMagic = 0x9e2a83c1;

class CppDataReader {
  currentOffset = 0;
  dataView?: DataView;
  buffer?: Uint8Array;

  // Primitives types
  readChar(incOffset = true) {
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    const value = this.dataView.getInt8(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 1;
    }
    return value;
  }

  readDouble(incOffset = true) {
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    const value = this.dataView.getFloat64(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  readFloat(incOffset = true) {
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    const value = this.dataView.getFloat32(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readUInt32(incOffset = true) {
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    const value = this.dataView.getUint32(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readInt32(incOffset = true) {
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    const value = this.dataView.getInt32(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readUInt64(incOffset = true) {
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    const value = this.dataView.getBigUint64(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  readInt64(incOffset = true) {
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    const value = this.dataView.getBigInt64(this.currentOffset, true);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  // For debuging
  debug(length = 1, as: 'hex' | 'bin', incOffset = false) {
    if (!this.buffer) {
      throw new Error('Save file not imported');
    }
    const value = this.buffer.slice(
      this.currentOffset,
      this.currentOffset + length
    );
    if (incOffset) {
      this.currentOffset += length;
    }
    if (as === 'hex') {
      return [...value]
        .map(value => value.toString(16).padStart(2, '0'))
        .join(' ');
    }
    if (as === 'bin') {
      return [...value]
        .map(value => value.toString(2).padStart(8, '0'))
        .join(' ');
    }
    return value;
  }

  debugLog(length = 4) {
    if (!this.buffer) {
      throw new Error('Save file not imported');
    }
    const atHex = this.currentOffset.toString(16);
    const atDec = this.currentOffset.toString(10);
    const valueArr = Array.from(
      this.buffer.slice(this.currentOffset, this.currentOffset + length)
    );
    const hexValue = valueArr
      .map(value => value.toString(16).padStart(2, '0'))
      .join(' ');
    const decValue = valueArr
      .map(value => value.toString(10).padStart(3, '0'))
      .join(' ');
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
      throw new Error('Save file not imported');
    }
    const length = this.readUInt32(incOffset);
    if (length === 0) {
      return '';
    }
    const value = new TextDecoder().decode(
      this.buffer.slice(this.currentOffset, this.currentOffset + length)
    );
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
      throw new Error('Save file not imported');
    }

    const v1 = this.dataView.getBigUint64(this.currentOffset, true);
    const v2 = this.dataView.getBigUint64(this.currentOffset + 8, true);
    if (incOffset) {
      this.currentOffset += 16;
    }
    return (v2 * 2n ** 64n + v1).toString(16).padStart(32, '0');
  }

  readFText(incOffset = true) {
    const flags = this.readUInt32(incOffset);
    const historyType = this.readUInt32(incOffset);
    const historyCount = this.readUInt32(incOffset);
    const string = this.readFString(incOffset);
    const namespace = this.readFName(incOffset);
    return { flags, historyType, historyCount, string, namespace };
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

  readTMapStringKey<T>(valueParser: (key: string) => T, incOffset = true) {
    const length = this.readInt32(incOffset);
    const map: Map<string, T> = new Map();
    for (let i = 0; i < length; i++) {
      const key = this.readFString(incOffset);
      const value = valueParser(key);
      map.set(key, value);
    }
    return map;
  }

  readTMap<V>(
    valueParser: (key: string, index: number) => V,
    limit: number | undefined = undefined,
    incOffset = true
  ) {
    const length = this.readInt32(incOffset);
    const map: Map<string, V> = new Map();
    for (let i = 0; i < Math.min(length, limit ?? length); i++) {
      const key = this.readFString(incOffset);
      const value = valueParser(key, i);
      map.set(key, value);
    }
    return map;
  }
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
  saveDataHash: string;
  isCreativeModeEnabled: boolean;
}

class SatisfactoryFileParser extends UnrealDataReader {
  parsedHeader: SatisfactorySaveHeader | null = null;

  parseSaveHeader() {
    if (!this.dataView) {
      throw new Error('Save file not imported');
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
    this.readBool(); //Unknown Boolean
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
      throw new Error('Save file not imported');
    }
    const magicNumber = this.readUInt32();
    if (magicNumber !== UnrealArchiveMagic) {
      throw new Error('Invalid magic number');
    }
    const version = this.readUInt32();
    if (version !== 0x22222222) {
      throw new Error('Invalid header');
    }

    this.currentOffset += 8 + 1 + 8 + 8;
    const compressedSize = Number(this.readInt64());
    const uncompressedSize = Number(this.readInt64());
    const infaltedData = new Uint8Array(uncompressedSize);
    unzlibSync(
      this.buffer.slice(
        this.currentOffset,
        this.currentOffset + compressedSize
      ),
      { out: infaltedData }
    );

    this.currentOffset += compressedSize;

    return {
      size: uncompressedSize,
      infaltedData,
    };
  }

  *inflateChunks() {
    if (!this.buffer) {
      throw new Error('Save file not imported');
    }
    let totalSize = 0;
    let count = 0;
    const infaltedDatas: Uint8Array[] = [];
    const offsets: number[] = [];
    while (this.currentOffset < this.buffer.byteLength) {
      yield { status: 'inflating', totalSize, count };
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

  parseObjectReference() {
    // res/headers/FGObjectReferencer.h:23
    const levelName = this.readFString();
    const pathName = this.readFString();
    return { levelName, pathName };
  }

  parseSatisfactoryObject() {
    // res/headers/FGActorSaveHeaderTypes.h:7
    const type = this.readInt32();
    const className = this.readFString();
    const reference = this.parseObjectReference();
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
      return {
        type,
        className,
        reference,
        needTransform,
        transform,
        wasPlacedInLevel,
      };
    }
  }

  parsePerStreamingLevelSaveData() {
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
    const objects: ReturnType<typeof this.parseSatisfactoryObject>[] = [];
    for (let i = 0; i < objectCount; i++) {
      objects.push(this.parseSatisfactoryObject());
    }
    const destroyedActorCount = this.readInt32();
    const destroyedActors: ReturnType<typeof this.parseObjectReference>[] = [];
    for (let i = 0; i < destroyedActorCount; i++) {
      destroyedActors.push(this.parseObjectReference());
    }

    if (this.currentOffset !== tocExpectEndOffset) {
      console.warn("Warning: TOC doesn't end where expected", {
        current: this.currentOffset.toString(16),
        expects: tocExpectEndOffset.toString(16),
      });
      this.currentOffset = tocExpectEndOffset;
    }

    const TOCBlob64c = {
      objects,
      destroyedActors,
    };

    //DataBlob64
    const dataLength = this.readUInt64();
    const dataCount = this.readInt32();
    const from = this.currentOffset.toString(16);
    this.currentOffset += Number(dataLength);
    const to = this.currentOffset.toString(16);

    return {
      TOCBlob64c,
      DataBlob64: {
        size: Number(dataLength),
        count: dataCount,
        from,
        to,
      },
    };
  }

  parseSaveBody() {
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

    const perLevelDataMap = this.readTMap(() => {
      const data = this.parsePerStreamingLevelSaveData();
      return data;
    }, 10);

    /* Uncomment if need to store
    import('fs/promises').then(async ({ writeFile }) => {
      await writeFile(
        'satisfactory_perLevelDataMap.json',
        JSON.stringify(Object.fromEntries(perLevelDataMap), null, 2)
      );
    });
    //*/

    return { bodySize };
  }

  async *importFromFile(filename: string) {
    yield { status: 'importing' };
    const { readFile } = await import('fs/promises');
    const { buffer } = await readFile(filename);
    yield { status: 'read', length: buffer.byteLength };
    this.buffer = new Uint8Array(buffer);
    this.dataView = new DataView(buffer);
  }

  async *parseSave() {
    if (!this.dataView || !this.buffer) {
      throw new Error('Save file not imported');
    }
    this.currentOffset = 0;
    const headers = this.parseSaveHeader();

    yield {
      status: 'parsedHeader',
      headers: headers,
    };

    const inflateProgress = this.inflateChunks();

    for (const progress of inflateProgress) {
      yield {
        status: 'inflating chunks',
        progress,
      };
    }

    yield {
      status: 'inflated',
      length: this.buffer.byteLength,
    };

    /* Comment this line (only) to output the inflated save file
    const { writeFile } = await import('fs/promises');
    await writeFile('satisfactory_inflated.bin', this.buffer);
    //*/

    const body = this.parseSaveBody();

    yield {
      status: 'parsedBody',
      body,
    };
  }
}

const parser = new SatisfactoryFileParser();
let statuses = parser.importFromFile('save_files/satisfactory.sav');
for await (const status of statuses) console.log('Importing: ', status);
statuses = parser.parseSave();
for await (const status of statuses) console.log('Parsing: ', status);
