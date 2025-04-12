const fs = require('fs'); // to maniulate file structure i.e create , dlt etc fs is used
const path = require('path') // to access location path is used
const dirCodes = path.join(__dirname , "Codes")
const {v4:uuid} = require('uuid');

if(!fs.existsSync(dirCodes))
{
    fs.mkdirSync( dirCodes , {recursive:true}  );
}
const generateFile = async(format , code)=>
{
    const jobId = uuid();
    const filename = `${jobId}.${format}` // set file name as a unique id.format like cpp or py
    const filepath = path.join (dirCodes,filename); // make the file path as codes/filename.format
    await fs.writeFileSync(filepath , code);
    return filepath;
}

module.exports = {
    generateFile,
};