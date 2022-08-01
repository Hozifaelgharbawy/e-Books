const app = require("express").Router();
let controller = require("../../controller/admin/book/book.controller");



app.get("/book/getAllBooks", controller.getAllBooks)
app.get("/book/getBook", controller.getBook)
module.exports = app