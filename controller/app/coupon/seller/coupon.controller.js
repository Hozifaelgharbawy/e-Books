let { get, create, list, update, remove } = require("../../../../modules/coupon/repo")




exports.addCoupon = async (req, res) => {
    const result = await create(req.body);
    console.log(result)
    res.status(result.code).json({ Coupon: result.record })
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

exports.updateCoupon = async(req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!", Coupon: result.record})
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error})
    }
}

exports.getCouponById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(result.code).json({ Coupon: result.record})
}