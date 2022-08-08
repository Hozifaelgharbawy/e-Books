const app = require("express").Router();
let controller = require("../../controller/admin/cart/cart.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")


app.get("/cart/getAllCarts", checkRole(endPoints.GET_ALL_CARTS), controller.getAllCarts)
app.get("/cart/getCart", checkRole(endPoints.GET_CART), controller.getCart)


module.exports = app