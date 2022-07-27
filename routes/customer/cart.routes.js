const app = require("express").Router();
let controller = require("../../controller/app/cart/customer/cart.controller");
let { createCartValidation, addBookInCartVaidation } = require("../../validation/cart.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")



app.get("/cart/:userId",checkRole(endPoints), controller.getMyCart)
app.put("/cart/updateCart", [validator(addBookInCartVaidation),checkRole(endPoints)], controller.updateCart)
app.put("/cart", [validator(addBookInCartVaidation),checkRole(endPoints)], controller.addBookInCart)
app.delete("/cart/removeItems",checkRole(endPoints), controller.removeItems)
app.delete("/cart/:bookId",checkRole(endPoints), controller.deleteBookInCart)




module.exports = app