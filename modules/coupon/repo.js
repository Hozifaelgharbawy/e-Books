let Coupon = require("./model")

exports.list = async () => {
    let AllCoupon = await Coupon.find({})
    return AllCoupon;
}

exports.get = async (id) => {
    if(id) return await this.isExist(id);
    else {
        return {
            success: false,
            code: 404,
            error: "Coupon ID required"
        }
    }
}

exports.create = async (form) => {
    if (form) {
        const coupon = new Coupon(form)
        await coupon.save();
        return {
            success: true,
            coupon: coupon,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404
        };
    }
}

exports.update = async (id, form) => {
    const coupon = await this.isExist(id);

    if(coupon.success) {
        const couponUpdate = await Coupon.findOneAndUpdate({_id: id}, form)
        return {
            success: true,
            coupon: couponUpdate,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: coupon.error,
            code: 404
        };
    }
}

exports.remove = async (id) => {
    const coupon = await this.isExist(id);
    if(coupon.success) {
        await Coupon.findByIdAndDelete(id)
        return {
            success: true,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: coupon.error,
            code: 404
        };
    }
}

exports.isExist = async (value) => {
    const coupon = await Coupon.findOne({ _id: value});
    if(coupon) {
        return {
            success: true,
            coupon: coupon,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404,
            error: "Coupon not found"
        };
    }
}
