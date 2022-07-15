let mongoose = require("mongoose");


let cartSchema = mongoose.Schema({
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

let cartModel = mongoose.model("carts", cartSchema)


module.exports = cartModel;
