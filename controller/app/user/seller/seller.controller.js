let { get } = require("../../../../modules/user/repo")


exports.getUserMyBooks = async (req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ myBooks: result.record.myBooks })
}