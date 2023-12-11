/*
Parsing of Satisfactory File
*/

const UnrealArchiveMagic = 0x9e2a83c1;

class SatisfactoryFileParser {
  currentOffset = 0;
  dataView: DataView | null = null;

  constructor(filename: string) {}

  // Primitives types
  readChar(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getInt8(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 1;
    }
    return value;
  }

  readDouble(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getFloat64(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  readFloat(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getFloat32(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readUInt32(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getUint32(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readInt32(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getInt32(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 4;
    }
    return value;
  }

  readUInt64(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getBigUint64(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  readInt64(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getBigInt64(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 8;
    }
    return value;
  }

  readDuration(incOffset = true) {
    const totalSeconds = this.readInt32(incOffset);
    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  // Unreal Types
  readBool(incOffset = true) {
    const value = this.readInt32(incOffset);
    return value === 1;
  }

  readFString(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const length = this.readUInt32(incOffset);
    const value = new TextDecoder().decode(
      this.dataView.buffer.slice(
        this.currentOffset,
        this.currentOffset + length
      )
    );
    this.currentOffset += length;
    if (incOffset) {
    }

    return value;
  }

  readFName(incOffset = true) {
    const index = this.readInt32(incOffset);
    const number = this.readInt32(incOffset);
    const value = this.readFString(incOffset);
    return { index, number, value };
  }

  readFMD5Hash(incOffset = true) {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    const value = this.dataView.getBigUint64(this.currentOffset);
    if (incOffset) {
      this.currentOffset += 8;
    }
    this.currentOffset += 8;

    return value;
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
    const hundredsNanoseconds = this.readInt64(incOffset);
    return new Date(Number(hundredsNanoseconds / 10000n - 11644473600000n));
  }

  readFSoftObjectPath(incOffset = true) {
    const value = this.readFString(incOffset);
    return value;
  }

  parseSaveHeader() {
    if (!this.dataView) {
      throw new Error('No dataView');
    }
    // Retrieve from C:\Program Files (x86)\Steam\steamapps\common\Satisfactory\CommunityResources\Headers\FGSaveManagerInterface.h#L45
    // int32   SaveHeaderVersion
    // int32   SaveVersion
    // int32   BuildVersion
    // FString MapName
    // FString MapOptions
    // FString SessionName
    // int32   PlayDurationSeconds
    // int64    SaveDateTime
    // int8    SessionVisibility
    // int32   EditorObjectVersion
    // FString ModMetadata
    // bool    IsModdedSave
    // FString SaveIdentifier
    // bool    IsPartitionedWorld
    // FMD5Has SaveDataHash
    // bool    IsCreativeModeEnabled

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
}
