const app = require("express").Router();
let controller = require("../../controller/app/user/customer/customer.controller");
let authController = require("../../controller/auth/user.controller");
let { registerValidation, loginValidation, updateUserValidation } = require("../../validation/user.validation")
let validator = require("../../helpers/common.validate")
let { checkSession } = require("../../utils/checkAuth.util")

let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/user/register", validator(registerValidation), authController.register)
app.post("/user/login", validator(loginValidation), authController.login)
app.put("/user/:id", validator(updateUserValidation), authController.updateUser)
app.put("/user/:bookId/:userId", [validator(updateUserValidation), checkRole(endPoints)], controller.addBookToFavorite)
app.get("/user/getUserFavorite/:id", [checkSession, checkRole(endPoints)], controller.getUserFavorite)
app.delete("/user/:bookId/:userId",  [checkSession, checkRole(endPoints)], controller.deleteBookFromFavorite)
app.get("/user/getUserMyBooks/:id",  [checkSession, checkRole(endPoints)], controller.getUserMyBooks)


module.exports = app