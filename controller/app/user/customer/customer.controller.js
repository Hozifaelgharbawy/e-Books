let { get, removeBook, updateArray } = require("../../../../modules/user/repo")
let Book = require("../../../../modules/book/repo")



exports.getUserMyBooks = async (req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ myBooks: result.record.myBooks })
}

exports.getUserFavorite = async (req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ Favorite: result.record.favorite })
}

exports.addBookToFavorite = async (req, res) => {
    const myBook = await Book.get(req.params.bookId)
    console.log(myBook.record)
    if (myBook.success) {
        const result = await updateArray(req.params.userId, { favorite: req.params.bookId })
        console.log(result.user)
        if (result.success) {
            res.status(result.code).json({ Favorite: result.record.favorite })
        }
        else {
            res.status(result.code).json({ message: "Error!", error: result.error })
        }
    }
    else {
        res.status(result.code).json({ message: "Error!", error: myBook.error })
    }
}

exports.deleteBookFromFavorite = async (req, res) => {
    const myBook = await Book.get(req.params.bookId)
    console.log(myBook.record)
    if (myBook.success) {
        const result = await removeBook(req.params.userId, { favorite: req.params.bookId })
        console.log(result)
        if (result.success) {
            res.status(200).json({ Favorite: result.record.favorite })
        }
        else {
            res.status(200).json({ message: "Book Not in favorite" })
        }
    }
    else {
        res.status(result.code).json({ message: "Error!", error: myBook.error })
    }
}