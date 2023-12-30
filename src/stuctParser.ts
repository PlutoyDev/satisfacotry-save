// Pre-defined struct parser from binary data
// export each struct type parser as a function readXXX, that expects a SatisfactoryFileParser and returns a parsed struct
// export interface of each struct type

import type { SatisfactoryFileParser } from "./parseSave.js";
import type { ObjectReference } from "./unrealDataReader.js";

/*
Generated with: 
  Outer type: grep -aoP "(?<=StructProperty\X{13})[A-Z]\w*\0" outputs/inflated.bin | sort | uniq
  Inner Type: grep -aoP "(?<=StructProperty\X{10})[A-Z]\w*\0" outputs/inflated.bin | sort | uniq 

Possible struct types:
  BlueprintCategoryRecord 
  BlueprintSubCategoryRecord
  Box
  FeetOffset
  FluidBox
  InventoryItem
  InventoryStack
  ItemAmount
  LinearColor
  PlayerRules
  Quat
  ScannableResourcePair
  SchematicCost
  SplinePointData
  SplitterSortRule
  SubCategoryMaterialDefault
  SubCategoryRecords
  Vector
  WireInstance
  

Some of the structs have fieldNames and can be automatically generated, some don't and need to be manually written
By Searching for the struct name in the binary file, we can find out which structs have fieldNames and which don't, below is the list of structs that

Have fieldNames: (Using generic parser)
  BlueprintCategoryRecord
  BlueprintSubCategoryRecord
  FeetOffset
  InventoryStack
  SchematicCost
  FSplinePointData (https://github.com/satisfactorymodding/SatisfactoryUnrealProject/blob/61951cccfc56c0b1bf0ce8a098c1ab6e98a79c57/StarterProject/Source/FactoryGame/FSplinePointData.h#L4)
  SplitterSortRule
  SubCategoryMaterialDefault
  SubCategoryRecords
  WireInstance
  ItemAmount

Don't have fieldNames:
  Vector (https://docs.unrealengine.com/4.27/en-US/API/Runtime/Core/Math/FVector/)
  Quat (https://docs.unrealengine.com/4.27/en-US/API/Runtime/Core/Math/FQuat/)
  Box (https://docs.unrealengine.com/4.27/en-US/API/Runtime/Core/Math/FBox/)
  LinearColor (https://docs.unrealengine.com/4.27/en-US/API/Runtime/Core/Math/FLinearColor/)
  FluidBox (FGFluidIntegrantInterface.h:16)
  InventoryItem (FGInventoryComponent.h:19)
*/

export interface Vector {
  x: number;
  y: number;
  z: number;
}

export function readVector(this: SatisfactoryFileParser): Vector {
  return {
    x: this.readDouble(),
    y: this.readDouble(),
    z: this.readDouble(),
  };
}

export interface Quat {
  x: number;
  y: number;
  z: number;
  w: number;
}

export function readQuat(this: SatisfactoryFileParser): Quat {
  return {
    x: this.readDouble(),
    y: this.readDouble(),
    z: this.readDouble(),
    w: this.readDouble(),
  };
}

export interface Box {
  min: Vector;
  max: Vector;
  isValid: boolean;
}

export function readBox(this: SatisfactoryFileParser): Box {
  return {
    min: readVector.call(this),
    max: readVector.call(this),
    isValid: this.readChar() !== 0,
  };
}

export interface LinearColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function readLinearColor(this: SatisfactoryFileParser): LinearColor {
  return {
    r: this.readFloat(),
    g: this.readFloat(),
    b: this.readFloat(),
    a: this.readFloat(),
  };
}

export interface FluidBox {
  content: number; //The current content of this fluid box in m^3
}

export function readFluidBox(this: SatisfactoryFileParser): FluidBox {
  return {
    content: this.readFloat(),
  };
}

export interface InventoryItem {
  itemClass: string;
  reference: ObjectReference;
  numItems: number;
}

export function readInventoryItem(this: SatisfactoryFileParser): InventoryItem {
  this.currentOffset += 4; // Unknown
  const itemClass = this.readFString();
  const reference = this.readObjectReference();

  this.currentOffset += 38; // "NumItems\0" + "IntProperty\0" + size + arrayIndex + hasPropertyGuid
  const numItems = this.readInt32();
  return {
    itemClass,
    reference,
    numItems,
  };
}

export interface IntVector {
  x: number;
  y: number;
  z: number;
}

export function readIntVector(this: SatisfactoryFileParser): IntVector {
  return {
    x: this.readInt32(),
    y: this.readInt32(),
    z: this.readInt32(),
  };
}
