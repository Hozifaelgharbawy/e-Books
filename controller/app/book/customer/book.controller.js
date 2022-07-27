
let { get, list } = require("../../../../modules/book/repo")
let Seller = require("../../../../modules/user/repo")



exports.getAllBook = async(req, res) => {
    const result = await list(req.query);
    console.log(result)
    res.status(200).json({ books: result})
}


exports.getBookById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ book: result.record})
}