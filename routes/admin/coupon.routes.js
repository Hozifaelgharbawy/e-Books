const app = require("express").Router();
let controller = require("../../controller/admin/coupon/coupon.controller");



app.get("/coupon/getAllCoupons", controller.getAllCoupons)
app.get("/coupon/getCoupon", controller.getCoupon)

module.exports = app