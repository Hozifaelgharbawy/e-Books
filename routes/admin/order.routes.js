const app = require("express").Router();
let controller = require("../../controller/admin/order/order.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.get("/order/getAllOrders", checkRole(endPoints.GET_ALL_ORDERS), controller.getAllOrders)
app.get("/order/getOrder", checkRole(endPoints.GET_ORDER), controller.getOrder)

module.exports = app