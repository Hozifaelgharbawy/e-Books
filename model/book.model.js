const { Decimal128 } = require("bson");
let mongoose = require("mongoose");


let bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Decimal128, required: true },
    linkFile: { type: String, required: true }
})

let bookModel = mongoose.model("books", bookSchema)


module.exports = bookModel;