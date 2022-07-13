let mongoose = require("mongoose");


let cardSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    books: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    total: { type: Number, required: true },
    promoCode: { type: Number, required: false }
})

let cardModel = mongoose.model("cards", cardSchema)


module.exports = cardModel;