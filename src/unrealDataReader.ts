import CppDataReader from "./cppDataReader.js";

export class UnrealDataReader extends CppDataReader {
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

  readFText(incOffset = true) {
    this.currentOffset += 4; // Flags (unused)
    const historyType = this.readInt8(incOffset);
    if (historyType === -1) {
      this.currentOffset += 4; // Unknown
      return this.readFString(incOffset);
    }
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

  readTArray<V>(valueParser: (index: number) => V, limit: number | undefined = undefined, incOffset = true) {
    const length = this.readInt32(incOffset);
    const array: V[] = [];
    for (let i = 0; i < Math.min(length, limit ?? length); i++) {
      array.push(valueParser(i));
    }
    return array;
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

  readPropertyTag(incOffset = true) {
    interface PropertyTag {
      name: string; // Name/Key of property
      type: string; // Type of property
      size: number; // Property size (default is 0)
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

    const name = this.readFString(incOffset);

    if (name === "None") {
      // End of properties
      return null;
    }

    const tag: PropertyTag = {
      name,
      type: this.readFString(incOffset).slice(0, -8), // Remove "Property"
      size: this.readInt32(incOffset),
    };

    // Translated from Unreal Source Code
    // https://github.com/EpicGames/UnrealEngine/blob/407acc04a93f09ecb42c07c98b74fd00cc967100/Engine/Source/Runtime/CoreUObject/Private/UObject/PropertyTag.cpp#L16

    tag.arrayIndex = this.readInt32(incOffset);

    if (tag.type === "Struct") {
      tag.structName = this.readFString(incOffset);
      tag.structGuid = this.readFGuid(incOffset);
    } else if (tag.type === "Bool") {
      tag.boolValue = this.readChar(incOffset) === 1;
    } else if (tag.type === "Byte" || tag.type === "Enum") {
      tag.enumName = this.readFString(incOffset);
    } else if (tag.type === "Array" || tag.type === "Set") {
      tag.innerType = this.readFString(incOffset).slice(0, -8); // Remove "Property"
    } else if (tag.type === "Map") {
      tag.innerType = this.readFString(incOffset).slice(0, -8); // Remove "Property"
      tag.valueType = this.readFString(incOffset).slice(0, -8); // Remove "Property"
    }

    tag.hasPropertyGuid = this.readChar(incOffset) === 1;
    if (tag.hasPropertyGuid) {
      tag.propertyGuid = this.readFGuid(incOffset);
    }

    return tag;
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

export type ObjectReference = ReturnType<UnrealDataReader["readObjectReference"]>;

export default UnrealDataReader;
