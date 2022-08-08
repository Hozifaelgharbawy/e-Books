const app = require("express").Router();
let controller = require("../../controller/admin/coupon/coupon.controller");
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")


app.get("/coupon/getAllCoupons", checkRole(endPoints.GET_ALL_COUPONS), controller.getAllCoupons)
app.get("/coupon/getCoupon", checkRole(endPoints.GET_COUPON), controller.getCoupon)

module.exports = app