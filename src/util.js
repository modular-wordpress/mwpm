const {exec} = require('child_process');
const fs = require("fs");
const path = require("path");

/**
 * @typedef {Object} ExecuteResults
 * @property {String} stdout
 * @property {String} stderr
 */

/**
 * Source: https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
 */
function deleteFile(dir, file) {
    return new Promise(function (resolve, reject) {
        var filePath = path.join(dir, file);
        fs.lstat(filePath, function (err, stats) {
            if (err) {
                return reject(err);
            }
            if (stats.isDirectory()) {
                resolve(deleteDirectory(filePath));
            } else {
                fs.unlink(filePath, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    });
};

/**
 * Source: https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
 * 
 * @param {String} dir
 */
function deleteDirectory(dir) {
    return new Promise(function (resolve, reject) {
        fs.access(dir, function (err) {
            if (err) {
                return reject(err);
            }
            fs.readdir(dir, function (err, files) {
                if (err) {
                    return reject(err);
                }
                Promise.all(files.map(function (file) {
                    return deleteFile(dir, file);
                })).then(function () {
                    fs.rmdir(dir, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                }).catch(reject);
            });
        });
    });
};

module.exports = {
    /**
     * Executes the given command and returns when the command is finished.
     * 
     * @param {String} command
     * @returns {Promise<ExecuteResults>}
     */
    execute: function(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if(error) {
                    reject(error);
                    return;
                }

                resolve({
                    stdout: stdout,
                    stderr, stderr
                });
            });
        });
    },
    deleteDirectory: deleteDirectory
};