let Book = require("./model")
let {addBookToMyBooks, removeBookFromMyBooks} = require("../user/repo")


exports.list = async (filter) => {
    let records = await Book.find(filter).select("-fileUrl");
    return records;
}

exports.get = async (filter) => {
    if(filter) return await this.isExist(filter);
    else {
        return {
            success: false,
            code: 404,
            error: "Book ID required"
        }
    }
}

exports.create = async (sellerId,form) => {
    const book = await this.isExist({title: form.title});
    console.log(book);
    if (!book.success) {
        const book = new Book(form)
        await book.save();
        await addBookToMyBooks({_id: sellerId}, book._id)
        return {
            success: true,
            record: book,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: "book is already there",
            code: 404
        };
    }
}

exports.update = async (id, form) => {
    const book = await this.isExist({_id: id});
    if(id && book.success) {
        await Book.findByIdAndUpdate({_id: id}, form)
        const bookUpdate = await this.isExist({_id: id});
        return {
            success: true,
            record: bookUpdate.record,
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

exports.remove = async (sellerId, bookId) => {
    const book = await this.isExist({_id: bookId});
    if(book.success) {
        await Book.findByIdAndDelete({_id: bookId})
        await removeBookFromMyBooks({_id:sellerId}, bookId)
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

exports.isExist = async (filter) => {
    const book = await Book.findOne(filter).select("-fileUrl");
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


