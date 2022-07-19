const app = require("express").Router();
let controller = require("../controller/app/book/book.controller");
let { addNewBookValidation, updateBookVaidation } = require("../validation/book.validation")
let validator = require("../helpers/common.validate")


app.post("/app/addNewBook/:id", validator(addNewBookValidation), controller.addNewBook)
app.delete("/app/deleteBook/:id", controller.deleteBook)
app.put("/app/updateBook/:id", validator(updateBookVaidation), controller.updateBook)
app.get("/app/getAllBook", controller.getAllBook)
app.get("/app/getBookById/:id", controller.getBookById)

module.exports = app