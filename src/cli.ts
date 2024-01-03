import SatisfactoryFileReader from "./parseSave.js";

// Create a simple cli command that excepts an optional flag for the save file path,
// as well as flags for outputs and each of the ouput options (all, inflatedBin, perLevelDataMap, persistentAndRuntimeData)
let saveFilePath: string | undefined = undefined;
let options: ConstructorParameters<typeof SatisfactoryFileReader>[1] = {};

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "-s" || arg === "--save-file") {
    i++;
    saveFilePath = `./save_files/${args[i]}.sav`;
  } else if (arg === "-o" || arg === "--output") {
    if (!options.toOutput) {
      options.toOutput = {};
    }
    i++;
    const output = args[i];
    if (!output || output === "none") {
      options.toOutput = undefined;
      continue;
    }

    if (output === "all") {
      options.toOutput.all = true;
    } else if (output === "header") {
      options.toOutput.header = true;
    } else if (output === "inflatedBin") {
      options.toOutput.inflatedBin = true;
    } else if (output === "perLevelDataMap") {
      options.toOutput.perLevelDataMap = true;
    } else if (output === "persistentAndRuntimeData") {
      options.toOutput.persistentAndRuntimeData = true;
    } else {
      console.error(`Unknown output option: ${output}`);
      process.exit(1);
    }
  }
}

if (!saveFilePath) {
  console.log("Using default save file path: ./save_files/main.sav");
  saveFilePath = "./save_files/main.sav";
}

if (!options.toOutput) {
  console.log("Using default output options: all");
  options.toOutput = { all: true };
}

console.log("\nReading save file:", saveFilePath);
const reader = new SatisfactoryFileReader(saveFilePath, options);
await reader.readSave();
