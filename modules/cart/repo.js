let Cart = require("./model")
let { get, update } = require("../book/repo")
let getCoupon = require("../coupon/repo").get
let updateCoupon = require("../coupon/repo").update

exports.list = async (filter) => {
    let records = await Cart.find(filter);
    return records;
}

exports.get = async (filter) => {
    if (filter) return await this.isExist(filter);
    else {
        return {
            success: false,
            code: 404,
            error: "User ID required"
        }
    }
}

exports.addPromoCode = async (userId, promoCode) => {
    let coupon = await getCoupon({ _id: promoCode })
    if (coupon.success) {
        if (coupon.record.quantity >= 1) {
            const cart = await this.isExist({ userId: userId });
            if (cart.success) {
                let total = cart.record.total * (coupon.record.discount/100)
                await Cart.findOneAndUpdate({ userId: userId }, { promoCode: promoCode, total: total  })
                await updateCoupon(coupon.record._id, { quantity: coupon.record.quantity - 1 })
                let cartUpdate = await Cart.findOne({ userId: userId })
                return {
                    success: true,
                    record: cartUpdate,
                    code: 200
                };
            }
        }
        else {
            return {
                success: false,
                error: "quantity of coupon have expired",
                code: 404
            };
        }
    }
    else {
        return {
            success: false,
            error: coupon.error,
            code: 404
        };
    }
}

exports.addItem = async (userId, bookId) => {
    const book = await get({ _id: bookId })
    let price = book.record.price - book.record.offer
    if (book.success) {
        const cart = await this.isExist({ userId: userId })
        const item = await this.isItemInCart(cart.record.items, bookId);
        if (item.success) {
            let quantity = item.record.quantity + 1
            let quantityBook = book.record.quantity - 1
            if (quantityBook >= 0) {
                let cartTotal = cart.record.total - item.record.total
                await Cart.updateMany({ userId: userId, "items.book": bookId }, { $set: { "items.$.quantity": quantity, "items.$.total": price * quantity } })
                await update(bookId, { quantity: quantityBook })
                await Cart.findOneAndUpdate({ userId: userId }, { total: cartTotal + (price * quantity) })
                const cartUpdate = await Cart.findOne({ userId: userId });
                return {
                    success: true,
                    record: cartUpdate,
                    code: 200
                };
            }
            else {
                return {
                    success: false,
                    error: "quantity of book have expired",
                    code: 404
                };
            }

        }
        else {
            let quantityBook = book.record.quantity - 1
            if (quantityBook >= 0) {
                await Cart.findOneAndUpdate({ userId: userId }, { total: cart.record.total + price, $push: { items: { book: bookId, quantity: 1, total: price } } })
                const cartUpdate = await Cart.findOne({ userId: userId });
                await update(bookId, { quantity: quantityBook })
                return {
                    success: true,
                    record: cartUpdate,
                    code: 200
                }
            }
            else {
                return {
                    success: false,
                    error: "quantity of book have expired",
                    code: 404
                };
            }
        }
    }
    else {
        return {
            success: false,
            error: book.error,
            code: 404
        };
    }
}

exports.removeItem = async (userId, bookId) => {
    const book = await get({ _id: bookId })
    let price = book.record.price - book.record.offer
    if (book.success) {
        const cart = await this.isExist({ userId: userId })
        const item = await this.isItemInCart(cart.record.items, bookId);
        if (item.success) {

            if (item.record.quantity > 1) {
                let cartTotal = cart.record.total - item.record.total
                let quantity = item.record.quantity - 1
                await Cart.updateMany({ userId: userId, "items.book": bookId }, { $set: { "items.$.quantity": quantity, "items.$.total": price * quantity } })
                await update(bookId, { quantity: book.record.quantity + 1 })
                await Cart.findOneAndUpdate({ userId: userId }, { total: cartTotal + (price * quantity) })
                const cartUpdate = await Cart.findOne({ userId: userId });
                return {
                    success: true,
                    record: cartUpdate,
                    code: 200
                };
            }
            else {
                await Cart.findOneAndUpdate({ userId: userId }, { total: cart.record.total - price, $pull: { items: { book: bookId } } })
                await update(bookId, { quantity: book.record.quantity + 1 })
                const cartUpdate = await Cart.findOne({ userId: userId });
                return {
                    success: true,
                    record: cartUpdate,
                    code: 200
                };
            }

        }
        else {
            return {
                success: false,
                error: item.error,
                code: 200
            };
        }
    }
    else {
        return {
            success: false,
            error: book.error,
            code: 404
        };
    }

}

exports.flush = async (filter) => {
    const cart = await this.isExist(filter);

    if (cart.success) {
        const cartUpdate = await Cart.findOneAndUpdate(filter, { items: [], total: 0 })
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

exports.isItemInCart = async (arrayOfItems, bookId) => {
    const result = await arrayOfItems.find(element => {
        if (element.book == bookId) return element
    });
    console.log(result);
    if (result) {
        return {
            success: true,
            record: result,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: "book that is not in items",
            code: 404
        };
    }
}

exports.isExist = async (filter) => {
    const cart = await Cart.findOne(filter);
    if (cart) {
        return {
            success: true,
            record: cart,
            code: 200
        };
    }
    else {
        const cart = new Cart({ userId: filter.userId, total: 0 })
        await cart.save();
        return {
            success: true,
            record: cart,
            code: 200
        };
    }
}
