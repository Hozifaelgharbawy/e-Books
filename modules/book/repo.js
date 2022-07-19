const { findById } = require("./model");
let Book = require("./model")

exports.list = async () => {
    let allBook = await Book.find({}).select("-fileUrl").select("-coverUrl").select("-_id").select("-__v");
    return allBook;
}

exports.get = async (id) => {
    if(id) return await this.isExist(id);
    else {
        return {
            success: false,
            code: 404,
            error: "Book ID required"
        }
    }
}

exports.create = async (form) => {
    if (form) {
        const book = new Book(form)
        await book.save();
        return {
            success: true,
            book: book,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404
        };
    }
}

exports.update = async (id, form) => {
    const book = await this.isExist(id);
    if(id && book.success) {
        const bookUpdate = await Book.findByIdAndUpdate({_id: id}, form)
        return {
            success: true,
            book: bookUpdate,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: book.error,
            code: 404
        };
    }
}

exports.remove = async (id) => {
    const book = await this.isExist(id);
    if(id && book.success) {
        await Book.findByIdAndDelete({_id: id})
        return {
            success: true,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: book.error,
            code: 404
        };
    }
}

exports.isExist = async (value) => {
    const book = await Book.findOne({ _id: value}).select("-fileUrl").select("-coverUrl").select("-_id").select("-__v");
    if(book) {
        return {
            success: true,
            book: book,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404,
            error: "Book not found"
        };
    }
}


