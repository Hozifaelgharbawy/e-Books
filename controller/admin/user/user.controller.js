let { get, list, remove, update } = require("../../../modules/user/repo")


exports.getUser = async (req, res) => {
    const result = await get(req.query)
    console.log(result)
    res.status(result.code).json({ user: result.record })
}

exports.getAllUsers= async (req, res) => {
    const result = await list(req.query);
    console.log(result)
    res.status(200).json({ books: result })
}


exports.deleteUser = async (req, res) => {
    const result = await remove(req.params.id)
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!" })
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error })
    }
}

exports.upgradeRole = async (req, res) => {
    let { role } = req.body
    const result = await update(req.params.id, {role: role})
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!", user: result.record })
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error })
    }
}