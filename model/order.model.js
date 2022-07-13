let mongoose = require("mongoose");


let orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    cardId: {
        type: mongoose.Types.ObjectId,
        ref: "cards"
    },
    books: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    total: { type: Number, required: true }
})

let orderModel = mongoose.model("orders", orderSchema)


module.exports = orderModel;