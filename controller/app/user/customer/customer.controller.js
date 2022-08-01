let { get, removeBookFromFavorite, addBookToFavorite } = require("../../../../modules/user/repo")
let getBook = require("../../../../modules/book/repo").get



exports.getUserMyBooks = async (req, res) => {
    const result = await get(req.query)
    console.log(result)
    if(result.success) {
        res.status(result.code).json({ myBooks: result.record.myBooks })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}

exports.getUserFavorite = async (req, res) => {
    const result = await get(req.query)
    console.log(result)
    if(result.success) {
        res.status(result.code).json({ Favorite: result.record.favorite })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}

exports.addBookToFavorite = async (req, res) => {
    const myBook = await getBook({_id: req.params.bookId})
    console.log(myBook.record)
    if (myBook.success) {
        const result = await addBookToFavorite({_id: req.params.userId},  req.params.bookId )
        console.log(result.user)
        if (result.success) {
            res.status(result.code).json({ Favorite: result.record.favorite })
        }
        else {
            res.status(result.code).json({ error: result.error })
        }
    }
    else {
        res.status(result.code).json({ message: "Error!", error: myBook.error })
    }
}

exports.deleteBookFromFavorite = async (req, res) => {
    const myBook = await getBook({_id: req.params.bookId})
    console.log(myBook.record)
    if (myBook.success) {
        const result = await removeBookFromFavorite({_id: req.params.userId}, req.params.bookId )
        console.log(result)
        if (result.success) {
            res.status(result.code).json({ message: "Success!" })
        }
        else {
            res.status(result.code).json({ message: result.error })
        }
    }
    else {
        res.status(result.code).json({ message: "Error!", error: myBook.error })
    }
}