let Order = require("./model")

exports.list = async () => {
    let records = await Order.find({})
    return {
        records,
        code: 200
    }
}

exports.get = async (id) => {
    if(id) return await this.isExist(id);
    else {
        return {
            success: false,
            code: 404,
            error: "Order ID required"
        }
    }
}

exports.create = async (form) => {
    if (form) {
        const order = new Order(form)
        await order.save();
        return {
            success: true,
            record: order,
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
    const order = await this.isExist(id);

    if(order.success) {
        const orderUpdate = await Order.findOneAndUpdate({_id: id}, form)
        return {
            success: true,
            record: orderUpdate,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: order.error,
            code: 404
        };
    }
}

exports.remove = async (id) => {
    const order = await this.isExist(id);
    if(order.success) {
        await Order.findByIdAndDelete(id)
        return {
            success: true,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: order.error,
            code: 404
        };
    }
}

exports.isExist = async (value) => {
    const order = await Order.findOne({ _id: value});
    if(order) {
        return {
            success: true,
            record: order,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404,
            error: "Order not found"
        };
    }
}
