const app = require("express").Router();
let controller = require("../../controller/admin/cart/cart.controller");


app.get("/cart/getAllCarts", controller.getAllCarts)
app.get("/cart/getCart", controller.getCart)


module.exports = app