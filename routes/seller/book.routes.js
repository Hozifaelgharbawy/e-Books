const app = require("express").Router();
let controller = require("../../controller/app/book/seller/book.controller");
let { addNewBookValidation, updateBookVaidation } = require("../../validation/book.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/book/:sellerId", controller.addNewBook)
app.delete("/book/:sellerId/:bookId", controller.deleteBook)
app.put("/book/:id", validator(updateBookVaidation), controller.updateBook)
app.get("/book", checkRole(endPoints), controller.getBook)


module.exports = app