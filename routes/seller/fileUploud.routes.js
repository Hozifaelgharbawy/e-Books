const app = require("express").Router();

let { fileUploud, coverUploud, demoUploud } = require("../../helpers/fileUploud")


app.post("/fileUploud", fileUploud.single("file"), (req,res) =>{
    console.log(req.file);
    res.status(200).json({message: "Sucsess!", filePath: req.file.path})
})

app.post("/coverUploud", coverUploud.single("cover"), (req,res) =>{
    console.log(req.file);
    res.status(200).json({message: "Sucsess!", coverPath: req.file.path})
})

app.post("/demoUploud", demoUploud.single("demo"), (req,res) =>{
    console.log(req.file);
    res.status(200).json({message: "Sucsess!", demoPath: req.file.path})
})

module.exports = app