
let { list } = require("../../../modules/cart/repo")


exports.getAllCart = async (req, res) => {
    const result = await list(req.query);
    console.log(result)
    res.status(200).json({ books: result })
}
