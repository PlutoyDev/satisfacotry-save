/*
Parsing of Satisfactory File
*/

import { readFileSync } from 'fs';
const UnrealArchiveMagic = 0x9e2a83c1;

class SatisfactoryFileParser {
  currentOffset: number;
  dataView: DataView;
  worker: Worker;

  constructor(filename: string) {
    const buffer = readFileSync(filename).buffer;
    this.dataView = new DataView(buffer);
  }

  // Primitives types
  readChar() {
    const value = this.dataView.getInt8(this.currentOffset);
    this.currentOffset += 1;
    return value;
  }

  readDouble() {
    const value = this.dataView.getFloat64(this.currentOffset);
    this.currentOffset += 8;
    return value;
  }

  readFloat() {
    const value = this.dataView.getFloat32(this.currentOffset);
    this.currentOffset += 4;
    return value;
  }

  readUInt32() {
    const value = this.dataView.getUint32(this.currentOffset);
    this.currentOffset += 4;
    return value;
  }

  readInt32() {
    const value = this.dataView.getInt32(this.currentOffset);
    this.currentOffset += 4;
    return value;
  }

  readUInt64() {
    const value = this.dataView.getBigUint64(this.currentOffset);
    this.currentOffset += 8;
    return value;
  }

  readInt64() {
    const value = this.dataView.getBigInt64(this.currentOffset);
    this.currentOffset += 8;
    return value;
  }

  readDuration() {
    const totalSeconds = this.readInt32();
    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  readFDateTime() {
    // 100 nanoseconds since 1/1/0001
    const hundredsNanoseconds = this.readInt64();
    return new Date(Number(hundredsNanoseconds / 10000n - 11644473600000n));
  }

  // Unreal Types
  readBool() {
    const value = this.readInt32();
    return value === 1;
  }

  readFString() {
    const length = this.readUInt32();
    const value = new TextDecoder().decode(
      this.dataView.buffer.slice(
        this.currentOffset,
        this.currentOffset + length
      )
    );
    this.currentOffset += length;
    return value;
  }

  readFName() {
    const index = this.readInt32();
    const number = this.readInt32();
    const value = this.readFString();
    return { index, number, value };
  }

  readFMD5Hash() {
    const value = this.dataView.getBigUint64(this.currentOffset);
    this.currentOffset += 8;
    return value;
  }

  readFText() {
    const flags = this.readUInt32();
    const historyType = this.readUInt32();
    const historyCount = this.readUInt32();
    const string = this.readFString();
    const namespace = this.readFName();
    return { flags, historyType, historyCount, string, namespace };
  }

  readFSoftObjectPath() {
    const value = this.readFString();
    return value;
  }

  parseSaveHeader() {
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
