const app = require("express").Router();
let controller = require("../../controller/app/cart/customer/cart.controller");
let { addBookInCartVaidation } = require("../../validation/cart.validation")
let validator = require("../../helpers/common.validate")




app.get("/cart", controller.getMyCart)
app.put("/cart/addPromoCode/:userId", validator(addBookInCartVaidation), controller.addPromoCode)
app.put("/cart/:userId/:bookId", validator(addBookInCartVaidation), controller.addBookInCart)
app.delete("/cart/:userId/:bookId", controller.deleteBookInCart)




module.exports = app