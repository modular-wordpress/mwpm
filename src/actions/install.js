const {execute, deleteDirectory} = require("./../util");

module.exports = async (path = "parent") => {
    let result = null;
    const parentURL = "https://github.com/modular-wordpress/parent-theme.git";

    console.log("Installing...")

    // clone the repository
    try {
        result = await execute(`git clone ${parentURL} ${path}`);
    } catch (e) {
        console.warn("Could not install parent theme:\n", e);
        return;
    }

    // clean up the git bits
    await deleteDirectory(`${process.cwd()}/${path}/.git/`);

    // and we're done
    console.log(result.stdout);
    console.log(result.stderr);

    console.log("Install complete.");
};