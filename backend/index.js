const express = require("express")
const app = express();
const {generateFile} = require("./generateFile");
const {executeCpp} = require("./executeCpp");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json(({hello:"World"}))
})

app.post("/run" , async(req,res)=>{
    const {code , language}= req.body;
    console.log("Incoming request body:", req.body); // Add this line
    if(code === undefined) {
        return res.status(400).json({success : false , error : "Empty code body"})
    }
    try{
    const filepath = await generateFile(language , code)
    // we need to generate a cpp file  with content from the request in it 
    //then we need to run the file and send the response

    let output ;
    switch(language){
        case "cpp":
            output = await executeCpp(filepath);
            break;
        case "py":
            output = await executePy(filepath);
            break;
        default:
            return res.status(400).json({success : false , error : "Unsupported language"})
    }
    return res.json({filepath , output});
    } catch(err){
        res.status(500).json({err});
    }
})


app.listen(5000 , ()=>{
    console.log("server running on port 5000")
})

