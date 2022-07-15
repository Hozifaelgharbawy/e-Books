let mongoose = require("mongoose");


let bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    fileUrl: { type: String, required: true },
    coverUrl: { type: String, required: true },
    offer: { type: Number, required: false },
    demo: { type: String, required: true },
    author: [{ type: String, required: true }]
})

let bookModel = mongoose.model("books", bookSchema)


module.exports = bookModel;