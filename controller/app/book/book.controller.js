let repo = require("../../../modules/book/repo")
let { get, create, list, update, remove } = require("../../../modules/book/repo")
let Seller = require("../../../modules/user/repo")



exports.addNewBook = async (req, res) => {
    const result = await create(req.body);
    const seller = await Seller.update(req.params.id, {myBooks: result.book})
    console.log(result, seller)
    res.status(200).json({ book: result.book })
}

exports.deleteBook = async(req, res) => {
    const result = await remove(req.params.id)
    console.log(result);
        if (result.success) {
        res.status(200).json({ massage: "Sucsses!" })
    }
    else {
        res.status(404).json({ message: "Error!", error: result.error})
    }
}

exports.updateBook = async(req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(200).json({ massage: "Sucsses!", user: result.book})
    }
    else {
        res.status(404).json({ massage: "Error!", error: result.error})
    }
}

exports.getAllBook = async(req, res) => {
    const result = await list();
    console.log(result)
    res.status(200).json({ books: result})
}

exports.getBookById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(200).json({ book: result.book})
}