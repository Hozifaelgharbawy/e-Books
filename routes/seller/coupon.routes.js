const app = require("express").Router();
let controller = require("../../controller/app/coupon/seller/coupon.controller");
let { addCouponValidation, updateCouponVaidation } = require("../../validation/coupon.validation")
let validator = require("../../helpers/common.validate")



app.post("/coupon", validator(addCouponValidation), controller.addCoupon)
app.delete("/coupon/:id", controller.deleteCoupon)
app.put("/coupon/:id", validator(updateCouponVaidation), controller.updateCoupon)
app.get("/coupon", controller.getCoupon)
app.get("/coupon/getMyCoupons/:sellerId", controller.getMyCoupons)
module.exports = app