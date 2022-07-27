const app = require("express").Router();
let controller = require("../../controller/app/book/customer/book.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.get("/book",checkRole(endPoints), controller.getAllBook)
app.get("/book/:id",checkRole(endPoints), controller.getBookById)




module.exports = app