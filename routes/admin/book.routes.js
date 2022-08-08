const app = require("express").Router();
let controller = require("../../controller/admin/book/book.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")


app.get("/book/getAllBooks", checkRole(endPoints.GET_ALL_BOOKS), controller.getAllBooks)
app.get("/book/getBook", checkRole(endPoints.GET_BOOK), controller.getBook)

module.exports = app