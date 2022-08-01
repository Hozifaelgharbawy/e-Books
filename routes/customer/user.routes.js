const app = require("express").Router();
let controller = require("../../controller/app/user/customer/customer.controller");
let { updateUserValidation } = require("../../validation/user.validation")
let validator = require("../../helpers/common.validate")
let { checkSession } = require("../../utils/checkAuth.util")


app.put("/user/:bookId/:userId", validator(updateUserValidation), controller.addBookToFavorite)
app.get("/user/getUserFavorite", checkSession, controller.getUserFavorite)
app.delete("/user/:bookId/:userId",  checkSession, controller.deleteBookFromFavorite)
app.get("/user/getUserMyBooks",  checkSession, controller.getUserMyBooks)


module.exports = app