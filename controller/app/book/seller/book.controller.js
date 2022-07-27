
let { get, create, update, remove } = require("../../../../modules/book/repo")
let Seller = require("../../../../modules/user/repo")



exports.addNewBook = async (req, res) => {
    const result = await create(req.body);
    const seller = await Seller.update(req.params.id, {myBooks: result.record})
    console.log(result, seller)
    res.status(result.code).json({ book: result.record })
}

exports.deleteBook = async(req, res) => {
    const result = await remove(req.params.id)
    console.log(result);
        if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!" })
    }
    else {
        res.status(result.code).json({ message: "Error!", error: result.error})
    }
}

exports.updateBook = async(req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!", user: result.record})
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error})
    }
}

exports.getBookById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ book: result.record})
}