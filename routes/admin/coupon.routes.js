const app = require("express").Router();
let controller = require("../../controller/admin/coupon/coupon.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.delete("/coupon/:id", checkRole(endPoints), controller.deleteCoupon)
app.get("/coupon", checkRole(endPoints), controller.getAllCoupon)
app.get("/coupon/:id", checkRole(endPoints), controller.getCouponById)

module.exports = app