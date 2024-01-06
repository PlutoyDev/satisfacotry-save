import { SatisfactoryObject } from "parseSave.js";

const typeOfConveyors = [
  "ConveyorBeltMk1",
  "ConveyorBeltMk2",
  "ConveyorBeltMk3",
  "ConveyorBeltMk4",
  "ConveyorBeltMk5",
  "ConveyorLiftMk1",
  "ConveyorLiftMk2",
  "ConveyorLiftMk3",
  "ConveyorLiftMk4",
  "ConveyorLiftMk5",
];

const typeOfResourceExtractors = ["OilPump", "WaterPump", "MinerMk1", "MinerMk2", "MinerMk3"];

const typeOfMachines = [
  "OilRefinery",
  "FoundryMk1",
  "Packager",
  "Blender",
  "ManufacturerMk1",
  "AssemblerMk1",
  "SmelterMk1",
  "ConstructorMk1",
  "HadronCollider",
];

const typeOfSorage = ["StorageContainerMk1", "StorageContainerMk2"];

export function simplifyProduction(objects: SatisfactoryObject[]) {
  const conveyor = new Set<string>();
  const spliters = new Set<string>();
  const smartSpliters = new Set<string>();
  const merger = new Set<string>();
  const resourceExtractors = new Set<string>();
  const machines = new Set<string>();
  const storage = new Set<string>();

  const connectionMap = new Map<string, string>();

  for (const obj of objects) {
    const {
      type,
      className,
      reference,
      outerPathName,
      needTransform,
      transform,
      pcInfo,
      wasPlacedInLevel,
      properties,
    } = obj;
    if (obj.pcInfo?.parent && obj.pcInfo.children && obj.pcInfo.children.length > 0) {
      if (obj.pcInfo.parent.pathName === "Persistent_Level:PersistentLevel.BuildableSubsystem") {
        const refName = obj.reference.pathName.slice(33);
        const buildingClass = obj.className.split("/")[6].split(".")[0];
        // Conveyor
        if (typeOfConveyors.some((type) => buildingClass === `Build_${type}`)) {
          conveyor.add(refName);
        }

        // Spliters
        if (buildingClass === "Build_ConveyorAttachmentSplitter") {
          spliters.add(refName);
        }

        // Smart Spliters
        if (buildingClass === "Build_ConveyorAttachmentSplitterSmart") {
          smartSpliters.add(refName);
        }

        // Merger
        if (buildingClass === "Build_ConveyorAttachmentMerger") {
          merger.add(refName);
        }

        // Resource Extractors
        if (typeOfResourceExtractors.some((type) => buildingClass === `Build_${type}`)) {
          resourceExtractors.add(refName);
        }

        // Machines
        if (
          typeOfMachines.some(
            (type) => obj.className === `/Game/FactoryGame/Buildable/Factory/${type}/Build_${type}.Build_${type}_C`,
          )
        ) {
          machines.add(refName);
        }

        // Storage
        if (typeOfSorage.some((type) => buildingClass === `Build_${type}`)) {
          storage.add(refName);
        }
      }
    }

  }

  return {
    buildables: {
      conveyor,
      spliters,
      smartSpliters,
      merger,
      resourceExtractors,
      machines,
      storage,
    },
  };
}
