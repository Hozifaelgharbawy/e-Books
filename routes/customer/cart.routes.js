const app = require("express").Router();
let controller = require("../../controller/app/cart/customer/cart.controller");
let { addBookInCartVaidation } = require("../../validation/cart.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")



app.get("/cart",checkRole(endPoints.GET_MY_CART), controller.getMyCart)
app.put("/cart/coupon/:userId", [checkRole(endPoints.APPLY_COUPON), validator(addBookInCartVaidation)], controller.applyCoupon)
app.put("/cart/:userId/:bookId/:quantity",[checkRole(endPoints.ADD_BOOK_IN_CART), validator(addBookInCartVaidation)], controller.addBookInCart)
app.delete("/cart/:userId/:bookId/:quantity",checkRole(endPoints.DELETE_BOOK_IN_CART), controller.deleteBookInCart)




module.exports = app