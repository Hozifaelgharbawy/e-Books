let { get, create, list, comparePassword, update, remove, removeBook } = require("../../../modules/user/repo")
let Book = require("../../../modules/book/repo")

exports.login = async (req, res) => {
    let { email, password } = req.body;
    const result = await comparePassword(email, password)
    console.log(result);
    if (result.success) {
        res.status(result.code).json({ massage: "Success!" })
    }
    else {
        res.status(result.code).json({ massage: "incorrect password" })
    }
}

exports.register = async (req, res) => {
    const result = await create(req.body);
    console.log(result)
    res.status(result.code).json({ user: result.user })
}

exports.update = async (req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!", user: result.user })
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error })
    }
}

exports.getMyBooks = async (req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ myBooks: result.user.myBooks })
}

exports.getFavorite = async (req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ Favorite: result.user.favorite })
}

exports.addFavorite = async (req, res) => {
    const myBook = await Book.get(req.params.bookId)
    console.log(myBook.book)
    if (myBook.success) {
        const result = await update(req.params.userId, { favorite: req.params.bookId })
        console.log(result.user)
        if (result.success) {
            res.status(result.code).json({ Favorite: result.user.favorite })
        }
        else {
            res.status(result.code).json({ message: "Error!", error: result.error })
        }
    }
    else {
        res.status(result.code).json({ message: "Error!", error: myBook.error })
    }
}

exports.deleteBookInFavorite = async (req, res) => {
    const myBook = await Book.get(req.params.bookId)
    console.log(myBook.book)
    if (myBook.success) {
        const result = await removeBook(req.params.userId, { favorite: req.params.bookId })
        console.log(result)
        if (result.success) {
            res.status(200).json({ Favorite: result.user.favorite })
        }
        else {
            res.status(200).json({ message: "Book Not in favorite" })
        }
    }
    else {
        res.status(result.code).json({ message: "Error!", error: myBook.error })
    }
}


