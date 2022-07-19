let { get, create, list, update, remove } = require("../../../modules/order/repo")


exports.getAllOrder = async(req, res) => {
    const result = await list();
    console.log(result)
    res.status(result.code).json({ Orders: result.AllOrder})
}

exports.addOrder = async (req, res) => {
    const result = await create(req.body);
    console.log(result)
    res.status(result.code).json({ Order: result.order })
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

exports.updateOrder = async(req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!", Order: result.order})
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error})
    }
}

exports.getOrderById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ Order: result.order})
}