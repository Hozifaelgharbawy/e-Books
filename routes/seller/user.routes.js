const app = require("express").Router();
let controller = require("../../controller/app/user/seller/seller.controller");
let { checkSession } = require("../../utils/checkAuth.util")



app.get("/user",checkSession, controller.getUserMyBooks)

module.exports = app