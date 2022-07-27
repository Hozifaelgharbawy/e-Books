const app = require("express").Router();
let controller = require("../../controller/app/order/customer/order.controller");
let { addOrderValidation, updateOrderVaidation } = require("../../validation/order.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/order", [validator(addOrderValidation), checkRole(endPoints)], controller.createOrder)
app.delete("/order/:id", checkRole(endPoints), controller.deleteOrder)
app.put("/order/:id", [validator(updateOrderVaidation),checkRole(endPoints)], controller.updateOrder)
app.get("/order/:id",checkRole(endPoints), controller.getOrderById)



module.exports = app