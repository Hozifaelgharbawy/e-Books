
let { get, create, update, remove } = require("../../../../modules/book/repo")



exports.addNewBook = async (req, res) => {
    console.log(req.body);
    const result = await create(req.params.sellerId,req.body);
    console.log(result)
    if (result.success) {
        res.status(result.code).json({ book: result.record })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}

exports.deleteBook = async(req, res) => {
    const result = await remove(req.params.sellerId,req.params.bookId)
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

exports.getBook = async(req, res) => {
    const result = await get(req.query)
    console.log(result)
    res.status(result.code).json({ book: result.record})
}