const app = require("express").Router();
let controller = require("../../controller/app/book/seller/book.controller");
let { addNewBookValidation, updateBookVaidation } = require("../../validation/book.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/book/:sellerId",[checkRole(endPoints.ADD_NEW_BOOK) ,validator(addNewBookValidation)] , controller.addNewBook)
app.delete("/book/:sellerId/:bookId",checkRole(endPoints.DELETE_BOOK), controller.deleteBook)
app.put("/book/:id", [checkRole(endPoints.UPDATE_BOOK),validator(updateBookVaidation)], controller.updateBook)
app.get("/book", checkRole(endPoints.GET_BOOK), controller.getBook)


module.exports = app