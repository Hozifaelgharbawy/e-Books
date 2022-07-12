let Book = require("../model/book.model")



exports.addNewBook = async(req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ massage: "Success!"})
}