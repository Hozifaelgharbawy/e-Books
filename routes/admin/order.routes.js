const app = require("express").Router();
let controller = require("../../controller/admin/order/order.controller");


app.get("/order/getAllOrders", controller.getAllOrders)
app.get("/order/getOrder", controller.getOrder)

module.exports = app