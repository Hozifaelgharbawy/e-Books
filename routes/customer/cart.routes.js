const app = require("express").Router();
let controller = require("../../controller/app/cart/customer/cart.controller");
let { addBookInCartVaidation } = require("../../validation/cart.validation")
let validator = require("../../helpers/common.validate")




app.get("/cart", controller.getMyCart)
app.put("/cart/coupon/:userId", validator(addBookInCartVaidation), controller.applyCoupon)
app.put("/cart/:userId/:bookId/:quantity", validator(addBookInCartVaidation), controller.addBookInCart)
app.delete("/cart/:userId/:bookId/:quantity", controller.deleteBookInCart)




module.exports = app