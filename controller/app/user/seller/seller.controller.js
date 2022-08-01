let { get } = require("../../../../modules/user/repo")


exports.getUserMyBooks = async (req, res) => {
    const result = await get(req.query)
    console.log(result)
    if(result.success) {
        res.status(result.code).json({ myBooks: result.record.myBooks })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}