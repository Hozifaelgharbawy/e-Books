const app = require("express").Router();
let controller = require("../controller/app/book/book.controller");


app.post("/app/addNewBook/:id", controller.addNewBook)



module.exports = app