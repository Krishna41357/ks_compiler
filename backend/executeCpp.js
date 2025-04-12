const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = (filepath) => {
    return new Promise((resolve, reject) => {
        const jobId = path.basename(filepath).split('.')[0];
        const outpath = path.join(outputPath, `${jobId}.exe`);
        console.log(`Compiling ${filepath} to ${outpath}`);
        
        exec(`g++ "${filepath}" -o "${outpath}" && cd "${outputPath}" && "${jobId}.exe"`, 
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

module.exports = {executeCpp};
