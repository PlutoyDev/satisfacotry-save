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
    console.log('length', length);
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

    return {
      size: uncompressedSize,
      infaltedData,
    };
  }

  inflateChunks() {
    if (!this.buffer) {
      throw new Error('Save file not imported');
    }
    let totalSize = 0;
    const infaltedDatas: Uint8Array[] = [];
    const offsets: number[] = [];
    while (this.currentOffset < this.buffer.byteLength) {
      const { size, infaltedData } = this.inflateChunk();
      infaltedDatas.push(infaltedData);
      totalSize += size;
      offsets.push(size);
    }

    delete this.buffer;
    delete this.dataView;

    this.buffer = new Uint8Array(totalSize);
    for (let i = 0; i < offsets.length; i++) {
      const data = infaltedDatas[i];
      const offset = i == 0 ? 0 : offsets[i - 1];
      this.buffer.set(data, offset);
    }

    this.dataView = new DataView(this.buffer.buffer);
    this.currentOffset = 0;
  }

  parseSaveBody() {
    const length = this.readInt64();
    // FWorldPartitionValidationData ValidationData
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
    if (!this.dataView) {
      throw new Error('Save file not imported');
    }
    this.currentOffset = 0;
    const headers = this.parseSaveHeader();

    yield {
      status: 'parsedHeader',
      headers: headers,
    };

    this.inflateChunks();
  }
}

const parser = new SatisfactoryFileParser();
let statuses = parser.importFromFile('save_files/satisfactory.sav');
for await (const status of statuses) console.log('Importing: ', status);
statuses = parser.parseSave();
for await (const status of statuses) console.log('Parsing: ', status);
