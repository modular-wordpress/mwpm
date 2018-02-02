#! /usr/bin/env node

const fs = require("fs");
const args = require("really-simple-args")();

// get current working directory
const wd = process.cwd();

// check if config file exists
if(!fs.existsSync(`${wd}/mwpm.config.json`)) {
    console.warn("mwpm.config.json config file not found! Please create one.");

    process.exit(-1);
}

// load config file
const CONFIG = require(`${wd}/mwpm.config.json`);

// check what the user asked for
if(args.getAmountOfArguments() < 1) {
    console.warn("Please specify what you want to do.");

    process.exit(-2);
}

const commandArg = args.getArgumentByIndex(0);

switch(commandArg) {
    case "install":
        require("./actions/install")(CONFIG.parentLocation);
        break;
    default:
        console.warn(`${commandArg} not recognized as a valid command.`);
        process.exit(-3);
}