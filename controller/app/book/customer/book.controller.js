
let { get, list } = require("../../../../modules/book/repo")




exports.getAllBooks = async(req, res) => {
    const result = await list(req.query);
    console.log(result)
    res.status(200).json({ books: result})
}


exports.getBook = async(req, res) => {
    const result = await get(req.query)
    console.log(result)
    res.status(result.code).json({ book: result.record})
}