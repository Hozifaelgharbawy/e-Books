let { create, list } = require("../../../../modules/order/repo");



exports.createOrder = async (req, res) => {
    const result = await create(req.params.cartId);
    console.log(result)
    if (result.success) {
        res.status(result.code).json({ Order: result.record })
    } else {
        res.status(result.code).json({ error: result.error })
    }

}


exports.getMyOrders = async (req, res) => {
    const result = await list({ userId: req.params.userId })
    console.log(result)
    res.status(result.code).json({ Order: result.records })
}
