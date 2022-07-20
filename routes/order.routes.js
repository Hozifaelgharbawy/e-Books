const app = require("express").Router();
let controller = require("../controller/app/order/order.controller");
let { addOrderValidation, updateOrderVaidation } = require("../validation/order.validation")
let validator = require("../helpers/common.validate")
let adminController = require("../controller/admin/order/order.controller");

app.post("/app/addOrder", validator(addOrderValidation), controller.addOrder)
app.delete("/app/deleteOrder/:id", controller.deleteOrder)
app.put("/app/updateOrder/:id", validator(updateOrderVaidation), controller.updateOrder)
app.get("/app/getOrderById/:id", controller.getOrderById)
//----------
app.get("/admin/getAllOrder", adminController.getAllOrder)
app.delete("/admin/deleteOrder/:id", adminController.deleteOrder)

module.exports = app