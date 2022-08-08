const app = require("express").Router();
let controller = require("../../controller/app/user/seller/seller.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")



app.get("/user",checkRole(endPoints.GET_USER_MYBOOKS), controller.getUserMyBooks)

module.exports = app