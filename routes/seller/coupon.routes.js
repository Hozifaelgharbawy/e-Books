const app = require("express").Router();
let controller = require("../../controller/app/coupon/seller/coupon.controller");
let { addCouponValidation, updateCouponVaidation } = require("../../validation/coupon.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")


app.post("/coupon",[checkRole(endPoints.ADD_COUPON) , validator(addCouponValidation)], controller.addCoupon)
app.delete("/coupon/:id",checkRole(endPoints.DELETE_COUPON), controller.deleteCoupon)
app.put("/coupon/:id",[checkRole(endPoints.UPDATE_COUPON), validator(updateCouponVaidation)], controller.updateCoupon)
app.get("/coupon",checkRole(endPoints.GET_COUPON), controller.getCoupon)
app.get("/coupon/getMyCoupons/:sellerId",checkRole(endPoints.GET_MY_COUPONS), controller.getMyCoupons)
module.exports = app