let Cart = require("./model")

exports.list = async (filter) => {
    let records = await Cart.find(filter);
    return records;
}

exports.get = async (filter) => {
    if(id) return await this.isExist(filter);
    else {
        return {
            success: false,
            code: 404,
            error: "User ID required"
        }
    }
}

exports.update = async (filter, form) => {
    const cart = await this.isExist(filter);
    console.log(cart);
    if(cart.success) {
        let cartUpdate = await Cart.findOneAndUpdate(filter,  form)
        console.log(cartUpdate);
        return {
            success: true,
            record: cartUpdate,
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

///--------------
exports.addBook = async (filter, form) => {
    const Id = await this.isExist({userId: filter.userId})
    const cart = await this.isItemsToCart(filter);
    console.log(cart)
    let quantity = cart.record
    console.log(quantity);
    if(cart.success) {
        const cartUpdate = await Cart.findOneAndUpdate({userId: filter.userId},{ items: { quantity: quantity+1}})
        
        return {
            success: true,
            record: cartUpdate,
            code: 200
        };
    }
    else {
        const cartUpdate = await Cart.findOneAndUpdate({userId: filter.userId}, {$addToSet: form})
        return {
            success: true,
            record: cartUpdate,
            code: 200
        };
    }
}

exports.removeBook = async (filter,bookId) => {

    const cart = await this.isExist(filter);

    if(cart.success) {
        let cartUpdate
        if(cart.record.items.quantity > 1) {
            cartUpdate = await Cart.findOneAndUpdate({userId: cart.record.userId}, {items: {quantity: cart.record.items.quantity-1}})
        }
        else {
            cartUpdate = await Cart.findOneAndUpdate({userId: cart.record.userId}, {$pull: {items: {book: bookId}}})
        }
        return {
            success: true,
            record: cartUpdate,
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
///---------------
exports.removeAllItems = async (filter) => {
    const cart = await this.isExist(filter);

    if(cart.success) {
        const cartUpdate = await Cart.findOneAndUpdate(filter, {items: []})
        return {
            success: true,
            record: cartUpdate,
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
            record: cart.record,
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

exports.isItemsToCart = async (filter) => {
    const cart = await Cart.findOne(filter);
    if(cart) {
        return {
            success: true,
            record: cart,
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

exports.isExist = async (filter) => {
    const cart = await Cart.findOne(filter);
    if(cart) {
        return {
            success: true,
            record: cart,
            code: 200
        };
    }
    else {
        const cart = new Cart({ userId: filter.userId, total: 0})
        await cart.save();
        return {
            success: true,
            record: cart,
            code: 200
        };
    }
}
