let BookRepo = require("../../../modules/book/repo")
let { get, create, update, remove, isExist} = require("../../../modules/cart/repo")
let User = require("../../../modules/user/repo")



exports.createCart = async (req, res) => {
    const result = await create(req.body);
    res.status(result.code).json({ cart: result.cart })
}

exports.getMyCart = async(req, res) => {
    const user = await User.isExist(req.params.userId)
    if (user.success) {
        const result = await get(req.params.userId)
        console.log(result)
        res.status(result.code).json({ cart: result.cart})
    }
    else {
        res.status(user.code).json({ error: user.error }) 
    }
}

//---------------------------------
exports.addBookInCart = async (req, res) => {
    const user = await User.isExist(req.params.userId)

    if (user.success) {
        const result = await update(req.params.userId, req.body)
        console.log(result)
        res.status(result.code).json({ cart: result.cart})
    }
    else {
        res.status(user.code).json({ error: user.error }) 
    }
}

exports.deleteBookInCart = async(req, res) => {
    const myBook = await BookRepo.get(req.params.bookId)
    console.log(myBook.book)
    const result = await remove(req.params.userId, {items: myBook.book})
    console.log(result.cart)
    if(result.success) {
        res.status(result.code).json({ items: result.cart})
    }
    else{
        res.status(result.code).json({ message: "Book Not in cart" })
    }
}