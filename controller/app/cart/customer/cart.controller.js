let { get, applyCoupon, removeItem, addItem } = require("../../../../modules/cart/repo")




exports.getMyCart = async (req, res) => {
    const result = await get({ userId: req.query.userId })
    console.log(result)
    if (result.success) {
        res.status(result.code).json({ cart: result.record })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}

exports.applyCoupon = async (req, res) => {
    let { promoCode } = req.body
    const result = await applyCoupon(req.params.userId, promoCode)
    console.log(result)
    if (result.success) {
        res.status(result.code).json({ cart: result.record })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}

exports.addBookInCart = async (req, res) => {
    const result = await addItem(req.params.userId, req.params.bookId, req.params.quantity)
    
    if (result.success) {
        res.status(result.code).json({ cart: result.record })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}

exports.deleteBookInCart = async (req, res) => {
    const result = await removeItem(req.params.userId, req.params.bookId, req.params.quantity)
    if (result.success) {
        res.status(result.code).json({ cart: result.record })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}