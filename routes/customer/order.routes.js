const app = require("express").Router();
let controller = require("../../controller/app/order/customer/order.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/order/:cartId",checkRole(endPoints.CREATE_ORDER), controller.createOrder)
app.get("/order/:userId",checkRole(endPoints.GET_MY_ORDERS), controller.getMyOrders)



module.exports = app