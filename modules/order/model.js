let mongoose = require("mongoose");


let orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    cartId: {
        type: mongoose.Types.ObjectId,
        ref: "carts"
    },
    total: { type: Number, required: true },
    items: [
        {
            book: { type: mongoose.Types.ObjectId, ref: "books" },
            quantity: Number,
            total: Number
        }
    ]
})

let orderModel = mongoose.model("orders", orderSchema)


module.exports = orderModel;