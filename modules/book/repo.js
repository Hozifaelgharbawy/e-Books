const { findById } = require("./model");
let Book = require("./model")

exports.list = async (filter) => {
    let records = await Book.find(filter).select("-fileUrl");
    return records;
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
            record: book,
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
            record: bookUpdate,
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
    const book = await Book.findOne({ _id: value}).select("-fileUrl");
    if(book) {
        return {
            success: true,
            record: book,
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


