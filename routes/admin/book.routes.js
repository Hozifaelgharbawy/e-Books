const app = require("express").Router();
let controller = require("../../controller/admin/book/book.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")



app.delete("/book/:id",checkRole(endPoints), controller.deleteBook)
app.get("/book", checkRole(endPoints), controller.getAllBook)


module.exports = app