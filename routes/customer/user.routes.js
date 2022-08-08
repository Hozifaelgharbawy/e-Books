const app = require("express").Router();
let controller = require("../../controller/app/user/customer/customer.controller");
let { updateUserValidation } = require("../../validation/user.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")


app.put("/user/:bookId/:userId",[checkRole(endPoints.ADD_BOOK_TO_FAVORITE), validator(updateUserValidation)], controller.addBookToFavorite)
app.get("/user/getUserFavorite", checkRole(endPoints.GET_USER_FAVORITE), controller.getUserFavorite)
app.delete("/user/:bookId/:userId",checkRole(endPoints.DELETE_BOOK_FROM_FAVORITE), controller.deleteBookFromFavorite)
app.get("/user/getUserMyBooks",  checkRole(endPoints.GET_USER_MYBOOKS), controller.getUserMyBooks)


module.exports = app