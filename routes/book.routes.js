const app = require("express").Router();
let controller = require("../controller/book.controller");


app.post("/addNewBook", controller.addNewBook)



module.exports = app