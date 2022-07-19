const app = require("express").Router();
let controller = require("../controller/app/order/order.controller");
let { addOrderValidation, updateOrderVaidation } = require("../validation/order.validation")
let validator = require("../helpers/common.validate")


app.post("/app/addOrder", validator(addOrderValidation), controller.addOrder)
app.delete("/app/deleteOrder/:id", controller.deleteOrder)
app.put("/app/updateOrder/:id", validator(updateOrderVaidation), controller.updateOrder)
app.get("/app/getAllOrder", controller.getAllOrder)
app.get("/app/getOrderById/:id", controller.getOrderById)

module.exports = app