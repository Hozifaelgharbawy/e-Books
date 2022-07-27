const app = require("express").Router();
let controller = require("../../controller/admin/order/order.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.get("/order", checkRole(endPoints), controller.getAllOrder)
app.delete("/order/:id",checkRole(endPoints), controller.deleteOrder)

module.exports = app