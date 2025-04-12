const { exec } = require("child_process");

const executePhp = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`php "${filepath}"`, (error, stdout, stderr) => {
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

module.exports = { executePhp };
