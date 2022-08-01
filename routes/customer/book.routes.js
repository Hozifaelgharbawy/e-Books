const app = require("express").Router();
let controller = require("../../controller/app/book/customer/book.controller");


app.get("/book", controller.getAllBooks)
app.get("/book", controller.getBook)




module.exports = app