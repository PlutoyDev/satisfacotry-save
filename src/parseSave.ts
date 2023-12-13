/*
Parsing of Satisfactory File
*/
import { unzlib } from 'fflate';

const UnrealArchiveMagic = 0x9e2a83c1;

class CppDataReader {
  currentOffset = 0;
  dataView: DataView | null = null;
  buffer: ArrayBuffer | null = null;

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
      return [...new Uint8Array(value)]
        .map(value => value.toString(16).padStart(2, '0'))
        .join(' ');
    }
    if (as === 'bin') {
      return [...new Uint8Array(value)]
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

class SatisfactorySaveBuilder {
  header: SatisfactorySaveHeader | null = null;
  uint8Array: Uint8Array | null = null;

  constructor() {}

  addHeader(header: SatisfactorySaveHeader) {
    this.header = header;
  }

  addChunk(chunk: Uint8Array) {
    if (!this.uint8Array) {
      this.uint8Array = chunk;
    } else {
      this.uint8Array = new Uint8Array([...this.uint8Array, ...chunk]);
    }
  }
}

class SatisfactoryFileParser extends UnrealDataReader {
  currentOffset = 0;
  dataView: DataView | null = null;
  buffer: ArrayBuffer | null = null;
  verbose: boolean = false;

  constructor() {
    super();
  }

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

    return {
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
  }

  async inflateChunk() {
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
    const maxChunkSize = this.readUInt64(); // 131072 or 0x20000 = 128kb
    const cNum = this.readChar(); // 3 = zlib
    const compressedSizeSum = this.readInt64();
    const uncompressedSizeSum = this.readInt64();
    const compressedSize = Number(this.readInt64());
    const uncompressedSize = this.readInt64();

    const chunkBuffer = this.buffer.slice(
      this.currentOffset,
      this.currentOffset + compressedSize
    );
    this.currentOffset += compressedSize;
    const data = await new Promise(resolve => {
      unzlib(new Uint8Array(chunkBuffer), (err, data) => {
        if (err) throw err;
        resolve(data);
      });
    });

    console.log('after', this.currentOffset.toString(16), this.debug(4, 'hex'));
  }

  async *importFromFile(filename: string) {
    yield { status: 'importing' };
    const { readFile } = await import('fs/promises');
    const { buffer } = await readFile(filename);
    yield { status: 'read', length: buffer.byteLength };
    this.buffer = buffer;
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

    this.inflateChunk();

    yield {
      status: 'test',
      next: this.debug(4, 'hex'),
      at: this.currentOffset.toString(16),
    };
  }
}

const parser = new SatisfactoryFileParser();
let statuses = parser.importFromFile('save_files/satisfactory.sav');
for await (const status of statuses) console.log('Importing: ', status);
statuses = parser.parseSave();
for await (const status of statuses) console.log('Parsing: ', status);
