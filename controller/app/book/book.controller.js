let repo = require("../../../modules/book/repo")
let { get, create, list, comparePassword, update, remove} = require("../../../modules/book/repo")
let Seller = require("../../../modules/user/repo")



exports.addNewBook = async (req, res) => {
    const result = await create(req.body);
    const seller = await Seller.update(req.params.id, {myBooks: result.book})
    console.log(result, seller)
    res.status(200).json({ book: result.book })
}

exports.deleteBook = async(req, res) => {
    const result = await remove(req.params.id)
    if (result.success) {
        res.status(200).json({ massage: "Sucsses!" })
    }
    else {
        res.status(404).json({ massage: "Error!", error: result.error})
    }
}
