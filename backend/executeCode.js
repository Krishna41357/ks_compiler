const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCode = (filepath, language) => {
    return new Promise((resolve, reject) => {
        let command;

        // Define the command based on language
        if (language === "cpp") {
            const jobId = path.basename(filepath).split(".")[0];
            const outpath = path.join(outputPath, `${jobId}.exe`);
            console.log(`Compiling ${filepath} to ${outpath}`);

            command = `g++ "${filepath}" -o "${outpath}" && cd "${outputPath}" && "${jobId}.exe"`;
        } 
        else if (language === "py") {
            command = `python "${filepath}"`;
        } 
        else if (language === "js") {
            command = `node "${filepath}"`;
        } 
        else if (language === "java") {
            const jobId = path.basename(filepath).split(".")[0];
            command = `javac "${filepath}" && java -cp "${path.dirname(filepath)}" "${jobId}"`;
        }
        else if (language === "ruby") {
            command = `ruby "${filepath}"`;
        }
        else if (language === "php") {
            command = `php "${filepath}"`;
        } 
        else {
            return reject({ success: false, error: "Unsupported language" });
        }

        // Execute the command
        exec(command, (error, stdout, stderr) => {
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

module.exports = { executeCode };
