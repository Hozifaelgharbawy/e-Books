let { list, get } = require("../../../modules/order/repo")

exports.getAllOrders = async (req, res) => {
    const result = await list(req.query);
    console.log(result)
    res.status(result.code).json({ Orders: result.records })
}

exports.getOrder = async (req, res) => {
    const result = await get(req.query)
    console.log(result)
    if (result.success) {
        res.status(result.code).json({ Order: result.record })
    }
    else {
        res.status(result.code).json({ error: result.error })
    }
}