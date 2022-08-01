const app = require("express").Router();
let controller = require("../../controller/app/order/seller/order.controller");



app.get("/order/getAllOrdersToSeller/:sellerId", controller.getAllOrdersToSeller)
app.get("/order/getAllOrdersToBook/:bookId", controller.getAllOrdersToBook)



module.exports = app