let { get, list, remove, update } = require("../../../modules/user/repo")


exports.getUserById = async (req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ user: result.record })
}

exports.getAllUser = async (req, res) => {
    const result = await list();
    console.log(result)
    res.status(200).json({ user: result })
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