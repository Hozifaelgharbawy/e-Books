let mongoose = require("mongoose");


let orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    items: [
        {
            book: { type: mongoose.Types.ObjectId, ref: "books" },
            quantity: Number,
            total: Number
        }
    ],
    total: { type: Number, required: true },
    promoCode: {
        type: mongoose.Types.ObjectId,
        ref: "coupons"
    }
})

let orderModel = mongoose.model("orders", orderSchema)


module.exports = orderModel;