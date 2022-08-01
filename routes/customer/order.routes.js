const app = require("express").Router();
let controller = require("../../controller/app/order/customer/order.controller");


app.post("/order/:cartId", controller.createOrder)
app.get("/order/:userId", controller.getMyOrders)



module.exports = app