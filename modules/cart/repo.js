let Cart = require("./model")


exports.get = async (id) => {
    if(id) return await this.isExist(id);
    else {
        return {
            success: false,
            code: 404,
            error: "User ID required"
        }
    }
}

exports.create = async (form) => {
    if (form) {
        const cart = new Cart(form)
        await cart.save();
        return {
            success: true,
            cart: cart,
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
    const cart = await this.isExist(id);

    if(cart.success) {
        const cartUpdate = await Cart.findOneAndUpdate({userId: id}, form)
        return {
            success: true,
            cart: cartUpdate,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: cart.error,
            code: 404
        };
    }
}

exports.remove = async (userId, book) => {
    const cart = await this.isExist(userId);
    if(cart.success) {
        await Cart.deleteMany(book)
        return {
            success: true,
            cart: cart.cart,
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

exports.isExist = async (value) => {
    const cart = await Cart.findOne({ userId: value}).select("-_id").select("-__v");
    if(cart) {
        return {
            success: true,
            cart: cart,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404,
            error: "Cart not found"
        };
    }
}
