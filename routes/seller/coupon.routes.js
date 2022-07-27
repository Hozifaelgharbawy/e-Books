const app = require("express").Router();
let controller = require("../../controller/app/coupon/seller/coupon.controller");
let { addCouponValidation, updateCouponVaidation } = require("../../validation/coupon.validation")
let validator = require("../../helpers/common.validate")

let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/coupon", [validator(addCouponValidation), checkRole(endPoints)], controller.addCoupon)
app.delete("/coupon/:id",checkRole(endPoints), controller.deleteCoupon)
app.put("/coupon/:id", [validator(updateCouponVaidation), checkRole(endPoints)], controller.updateCoupon)
app.get("/coupon/:id",checkRole(endPoints), controller.getCouponById)

module.exports = app