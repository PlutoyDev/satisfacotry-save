// Pre-defined struct parser from binary data
// export each struct type parser as a function readXXX, that expects a UnrealDataReader and returns a parsed struct
// export interface of each struct type

import UnrealDataReader from "./unrealDataReader.js";
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

export function readVector(reader: UnrealDataReader): Vector {
  return {
    x: reader.readDouble(),
    y: reader.readDouble(),
    z: reader.readDouble(),
  };
}

export interface Quat {
  x: number;
  y: number;
  z: number;
  w: number;
}

export function readQuat(reader: UnrealDataReader): Quat {
  return {
    x: reader.readDouble(),
    y: reader.readDouble(),
    z: reader.readDouble(),
    w: reader.readDouble(),
  };
}

export interface Box {
  min: Vector;
  max: Vector;
  isValid: boolean;
}

export function readBox(reader: UnrealDataReader): Box {
  return {
    min: readVector(reader),
    max: readVector(reader),
    isValid: reader.readChar() !== 0,
  };
}

export interface LinearColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function readLinearColor(reader: UnrealDataReader): LinearColor {
  return {
    r: reader.readFloat(),
    g: reader.readFloat(),
    b: reader.readFloat(),
    a: reader.readFloat(),
  };
}

export interface FluidBox {
  content: number; //The current content of this fluid box in m^3
}

export function readFluidBox(reader: UnrealDataReader): FluidBox {
  return {
    content: reader.readFloat(),
  };
}

export interface InventoryItem {
  itemClass: string;
  reference: ObjectReference;
  numItems: number;
}

export function readInventoryItem(reader: UnrealDataReader): InventoryItem {
  reader.currentOffset += 4; // Unknown
  const itemClass = reader.readFString();
  const reference = reader.readObjectReference();

  reader.currentOffset += 38; // "NumItems\0" + "IntProperty\0" + size + arrayIndex + hasPropertyGuid
  const numItems = reader.readInt32();
  return {
    itemClass,
    reference,
    numItems,
  };
}
