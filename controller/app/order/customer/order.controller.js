let { get, create, update, remove } = require("../../../../modules/order/repo")
let Cart = require("../../../../modules/cart/repo")
let myBook = require("../helper/myBook")



exports.createOrder = async (req, res) => {
    let { userId, items } = req.body
    const result = await create(req.body);
    console.log(result)
    myBook.addMyBook( items.book,userId);
    res.status(result.code).json({ Order: result.record })
    await Cart.removeAllItems({userId: userId})
}

exports.deleteOrder = async(req, res) => {
    const result = await remove(req.params.id)
    console.log(result);
        if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!" })
    }
    else {
        res.status(result.code).json({ message: "Error!", error: result.error})
    }
}

exports.updateOrder = async(req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!", Order: result.record})
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error})
    }
}

exports.getOrderById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ Order: result.record})
}