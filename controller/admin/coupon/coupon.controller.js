let { get, list } = require("../../../modules/coupon/repo")


exports.getAllCoupons = async(req, res) => {
    const result = await list(req.query);
    console.log(result)
    res.status(200).json({ Coupons: result})
}


exports.getCoupon = async(req, res) => {
    const result = await get(req.query)
    console.log(result)
    res.status(result.code).json({ Coupon: result.record})
}