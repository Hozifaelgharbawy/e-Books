let BookRepo = require("../../../../modules/book/repo")
let { get, update, removeBook, addBook, removeAllItems } = require("../../../../modules/cart/repo")
let User = require("../../../../modules/user/repo")




exports.getMyCart = async (req, res) => {
    const user = await User.isExist(req.query.userId)
    if (user.success) {
        const result = await get(req.query)
        console.log(result)
        res.status(result.code).json({ cart: result.record })
    }
    else {
        res.status(user.code).json({ error: user.error })
    }
}
exports.removeItems = async (req, res) => {
    
    const result = await removeAllItems(req.query)
    console.log(result)
    res.status(result.code).json({ cart: result.record })


}

exports.updateCart = async (req, res) => {
    const result = await update(req.query, req.body)
    console.log(result)
    res.status(result.code).json({ cart: result.record })
}

exports.addBookInCart = async (req, res) => {
    const result = await addBook(req.query, req.body)
    console.log(result)
    res.status(result.code).json({ cart: result.record })
}

exports.deleteBookInCart = async (req, res) => {

    const result = await removeBook(req.query, req.params.bookId)
    console.log(result.record)
    if (result.success) {
        res.status(result.code).json({ items: result.record })
    }
    else {
        res.status(result.code).json({ message: "Book Not in cart" })
    }
}