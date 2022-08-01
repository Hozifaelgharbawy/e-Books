let Coupon = require("./model")

exports.list = async (filter) => {
    let records = await Coupon.find(filter)
    return records;
}

exports.get = async (filter) => {
    if(filter) return await this.isExist(filter);
    else {
        return {
            success: false,
            code: 404
        }
    }
}

exports.create = async (form) => {
    const coupon = await this.isExist({code: form.code});
    if (!coupon.success) {
        const coupon = new Coupon(form)
        await coupon.save();
        return {
            success: true,
            record: coupon,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: "coupon already available",
            code: 404
        };
    }
}

exports.update = async (id, form) => {
    const coupon = await this.isExist({_id: id});

    if(coupon.success) {
         await Coupon.findOneAndUpdate({_id: id}, form)
         const couponUpdate = await this.isExist({_id: id});
        return {
            success: true,
            record: couponUpdate.record,
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

exports.reduceQuantity= async (code) => {
    const coupon = await this.isExist({code: code});

    if(coupon.success) {
        const couponUpdate = await Coupon.findOneAndUpdate({code: code}, {quantity: coupon.record.quantity-1})
        return {
            success: true,
            record: couponUpdate,
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
    const coupon = await this.isExist({_id: id});
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

exports.isExist = async (filter) => {
    const coupon = await Coupon.findOne(filter);
    if(coupon) {
        return {
            success: true,
            record: coupon,
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
