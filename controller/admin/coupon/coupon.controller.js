let { get, create, list, update, remove } = require("../../../modules/coupon/repo")


exports.getAllCoupon = async(req, res) => {
    const result = await list();
    console.log(result)
    res.status(200).json({ Coupons: result})
}



exports.deleteCoupon = async(req, res) => {
    const result = await remove(req.params.id)
    console.log(result);
        if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!" })
    }
    else {
        res.status(result.code).json({ message: "Error!", error: result.error})
    }
}


exports.getCouponById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ Coupon: result.record})
}