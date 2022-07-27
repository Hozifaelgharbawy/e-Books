const app = require("express").Router();
let controller = require("../../controller/admin/cart/cart.controller");

let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")


app.get("/cart",checkRole(endPoints), controller.getAllCart)



module.exports = app