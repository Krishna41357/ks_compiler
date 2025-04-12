const { exec } = require("child_process");

const executeRuby = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`ruby "${filepath}"`, (error, stdout, stderr) => {
            if (error) {
                return reject({ success: false, error: error.message });
            }
            if (stderr) {
                return reject({ success: false, error: stderr });
            }
            resolve(stdout);
        });
    });
};

module.exports = { executeRuby };
