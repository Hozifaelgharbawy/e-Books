
let {  list, remove } = require("../../../modules/book/repo")


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


exports.getAllBook = async(req, res) => {
    const result = await list();
    console.log(result)
    res.status(200).json({ books: result})
}
