const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');


const executePy = (filepath) => {
    return new Promise((resolve, reject) => {
     
        exec(`python "${filepath}"`, 
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error compiling C++ code: ${error.message}`);
                    return reject({success: false, error: error.message});
                }
                if (stderr) {
                    console.error(`Compilation stderr: ${stderr}`);
                    return reject({success: false, error: stderr});
                }
                console.log(`Compilation successful: ${stdout}`);
                resolve(stdout);
            }
        );
    });
};

module.exports = {executePy};
