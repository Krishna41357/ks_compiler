const { exec } = require('child_process');
const path = require('path');

const executeJs = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`node "${filepath}"`, (error, stdout, stderr) => {
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

module.exports = { executeJs };
