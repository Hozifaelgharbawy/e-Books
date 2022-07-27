const app = require("express").Router();
let controller = require("../../controller/app/book/seller/book.controller");
let { addNewBookValidation, updateBookVaidation } = require("../../validation/book.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/book/:id", [validator(addNewBookValidation), checkRole(endPoints)], controller.addNewBook)
app.delete("/book/:id",checkRole(endPoints), controller.deleteBook)
app.put("/book/:id", [validator(updateBookVaidation), checkRole(endPoints)], controller.updateBook)
app.get("/book/:id",checkRole(endPoints), controller.getBookById)


module.exports = app