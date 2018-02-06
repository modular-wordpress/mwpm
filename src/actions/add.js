const {execute, deleteDirectory, cp} = require("./../util");
const fs = require("fs");

module.exports = async (args, config) => {
    if(args.getAmountOfArguments() < 3) {
        console.warn("Please specify what module you want to add.");
        return;
    }

    const moduleName = args.getArgumentByIndex(1);
    const moduleRepo = args.getArgumentByIndex(2);
    const wd = process.cwd();
    const modulesPath = config.modulesLocation;
    const targetDirectory = `${wd}/${modulesPath}/${moduleName}`;
    const directoryMode = args.hasParameter("d");

    console.log(`Installing ${moduleName}...`);

    if(fs.existsSync(targetDirectory)) {
        await deleteDirectory(targetDirectory);
    }

    if(!directoryMode) {
        await execute(`git clone ${moduleRepo} ${targetDirectory}`);

        await deleteDirectory(`${targetDirectory}/.git`);
    } else {
        const direct = args.getParameter("d");

        await execute(`git clone ${moduleRepo} ${wd}/${modulesPath}/_tmp`);
        await deleteDirectory(`${wd}/${modulesPath}/_tmp/.git`);

        // copy the specified directory
        await cp(`${wd}/${modulesPath}/_tmp/${direct}/*`, targetDirectory);

        // delete the temp directory
        await deleteDirectory(`${wd}/${modulesPath}/_tmp`);
    }

    // add to config
    if(!config.modules) {
        config.modules = {};
    }

    config.modules[moduleName] = {
        "type": "module",
        "source": "github",
        "name": moduleName,
        "url": moduleRepo
    };

    if(directoryMode) {
        config.modules[moduleName].directory = args.getParameter("d");
    }

    fs.writeFileSync(`${wd}/mwpm.config.json`, JSON.stringify(config, null, 4));

    console.log("Installation complete.");
};