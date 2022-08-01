
let { list, get } = require("../../../modules/cart/repo")


exports.getAllCarts = async (req, res) => {
    const result = await list(req.query);
    console.log(result)
    res.status(200).json({ books: result })
}

exports.getCart = async (req, res) => {
    const result = await get(req.query)
    console.log(result)
    if (result.success) {
        res.status(result.code).json({ cart: result.record })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}
