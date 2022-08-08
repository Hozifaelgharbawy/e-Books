const app = require("express").Router();
let controller = require("../../controller/app/order/seller/order.controller");

let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.get("/order/getAllOrdersToSeller/:sellerId",checkRole(endPoints.GET_ALL_ORDER_TO_SELLER), controller.getAllOrdersToSeller)
app.get("/order/getAllOrdersToBook/:bookId",checkRole(endPoints.GET_ALL_ORDER_TO_BOOK), controller.getAllOrdersToBook)



module.exports = app