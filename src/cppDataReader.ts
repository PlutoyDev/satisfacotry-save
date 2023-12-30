export class CppDataReader {
  currentOffset = 0;
  dataView?: DataView;
  buffer?: Uint8Array;

  constructor(buffer?: Uint8Array) {
    this.buffer = buffer;
    this.dataView = buffer ? new DataView(buffer.buffer) : undefined;
  }

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

export default CppDataReader;
