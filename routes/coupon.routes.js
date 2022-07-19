const app = require("express").Router();
let controller = require("../controller/app/coupon/coupon.controller");
let { addCouponValidation, updateCouponVaidation } = require("../validation/coupon.validation")
let validator = require("../helpers/common.validate")


app.post("/app/addCoupon", validator(addCouponValidation), controller.addCoupon)
app.delete("/app/deleteCoupon/:id", controller.deleteCoupon)
app.put("/app/updateCoupon/:id", validator(updateCouponVaidation), controller.updateCoupon)
app.get("/app/getAllCoupon", controller.getAllCoupon)
app.get("/app/getCouponById/:id", controller.getCouponById)

module.exports = app