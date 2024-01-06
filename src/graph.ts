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

  const prodLineBuildings = new Set<string>();
  const connectionMap = new Map<string, string>();
  // key is outerName, from is
  const conveyorMap = new Map<
    string,
    {
      from?: string;
      to?: string;
    }
  >();

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
          prodLineBuildings.add(refName);
        }

        // Spliters
        if (buildingClass === "Build_ConveyorAttachmentSplitter") {
          spliters.add(refName);
          prodLineBuildings.add(refName);
        }

        // Smart Spliters
        if (buildingClass === "Build_ConveyorAttachmentSplitterSmart") {
          smartSpliters.add(refName);
          prodLineBuildings.add(refName);
        }

        // Merger
        if (buildingClass === "Build_ConveyorAttachmentMerger") {
          merger.add(refName);
          prodLineBuildings.add(refName);
        }

        // Resource Extractors
        if (typeOfResourceExtractors.some((type) => buildingClass === `Build_${type}`)) {
          resourceExtractors.add(refName);
          prodLineBuildings.add(refName);
        }

        // Machines
        if (
          typeOfMachines.some(
            (type) => obj.className === `/Game/FactoryGame/Buildable/Factory/${type}/Build_${type}.Build_${type}_C`,
          )
        ) {
          machines.add(refName);
          prodLineBuildings.add(refName);
        }

        // Storage
        if (typeOfSorage.some((type) => buildingClass === `Build_${type}`)) {
          storage.add(refName);
          prodLineBuildings.add(refName);
        }
      }
    }

    if (type === 0 && outerPathName) {
      // Object
      if (
        className === "/Script/FactoryGame.FGFactoryConnectionComponent" &&
        typeof properties?.mConnectedComponent === "object" &&
        properties.mConnectedComponent &&
        "pathName" in properties.mConnectedComponent &&
        typeof properties.mConnectedComponent.pathName === "string"
      ) {
        const outerName = outerPathName.slice(33);
        const self = reference.pathName.slice(33);
        const connected = properties.mConnectedComponent.pathName.slice(33);
        if (conveyor.has(outerName)) {
          // If this connection is a conveyor
          const isOutput = properties.mDirection === "EFactoryConnectionDirection::FCD_OUTPUT";
          const isInput = properties.mDirection === "EFactoryConnectionDirection::FCD_INPUT";
          if (!isOutput && !isInput) {
            continue;
          }
          const connectedBuilding = connected.split(".")[0];
          if (isInput && conveyorMap.has(connectedBuilding) && conveyorMap.get(connectedBuilding)!.from) {
            console.count("isInput");
            // connected to another conveyor and has been recorded, simplify the connection by combining them
            const convFrom = conveyorMap.get(connectedBuilding)!.from!;
            conveyorMap.delete(connectedBuilding);
            conveyorMap.set(outerName, { from: convFrom, to: connected });
          } else if (isOutput && conveyorMap.has(connectedBuilding) && conveyorMap.get(connectedBuilding)!.to) {
            console.count("isOutput");
            // connected to another conveyor and has been recorded, simplify the connection by combining them
            const convTo = conveyorMap.get(connectedBuilding)!.to!;
            conveyorMap.delete(connectedBuilding);
            conveyorMap.set(outerName, { from: connected, to: convTo });
          } else {
            const { from, to } = conveyorMap.get(outerName) ?? {};
            // if (!from || !to) {
            conveyorMap.set(outerName, { from: isInput ? connected : from, to: isOutput ? connected : to });
            // } else {
            //   console.count("reassigning");
            // }
          }
        }
        if (prodLineBuildings.has(outerName)) {
          if (connectionMap.has(connected)) {
            const other = connectionMap.get(connected);
            if (other && other !== self) {
              connectionMap.delete(connected);
              connectionMap.set(self, other);
            }
          } else {
            connectionMap.set(connected, self);
          }
        }
      }
    }
  }

  return {
    conveyorMap: Array.from(conveyorMap.values()),
  };
}
