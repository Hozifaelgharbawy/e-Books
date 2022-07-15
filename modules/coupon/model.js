let mongoose = require("mongoose");


let couponSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    code: { type: String, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, required: true }
})

let couponModel = mongoose.model("coupons", couponSchema)


module.exports = couponModel;