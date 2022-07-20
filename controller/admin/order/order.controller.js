let { get, create, list, update, remove } = require("../../../modules/order/repo")

exports.getAllOrder = async(req, res) => {
    const result = await list();
    console.log(result)
    res.status(result.code).json({ Orders: result.AllOrder})
}

exports.deleteOrder = async(req, res) => {
    const result = await remove(req.params.id)
    console.log(result);
        if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!" })
    }
    else {
        res.status(result.code).json({ message: "Error!", error: result.error})
    }
}