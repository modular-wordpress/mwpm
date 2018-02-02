#! /usr/bin/env node

const fs = require("fs");

// get current working directory
const wd = process.cwd();

// check if config file exists
if(!fs.existsSync(`${wd}/mwpm.config.json`)) {
    console.warn("mwpm.config.json config file not found! Please create one.");

    process.exit(-1);
}

// load config file
const CONFIG = require(`${wd}/mwpm.config.json`);

console.log(CONFIG);