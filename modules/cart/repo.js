const { findOne } = require("./model")
let Cart = require("./model")
let getBook = require("../book/repo").get
let updateBook = require("../book/repo").update
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

exports.applyCoupon = async (userId, couponID) => {
    let coupon = await getCoupon({ _id: couponID })
    if (coupon.success) {
        if (coupon.record.quantity >= 1) {
            const cart = await this.isExist({ userId: userId });
            if (cart.success && !cart.record.promoCode) {
                let total = cart.record.total - (cart.record.total * (coupon.record.discount / 100))
                await Cart.findOneAndUpdate({ userId: userId }, { promoCode: couponID, total: total })
                await updateCoupon(coupon.record._id, { quantity: coupon.record.quantity - 1 })
                let cartUpdate = await Cart.findOne({ userId: userId })
                return {
                    success: true,
                    record: cartUpdate,
                    code: 200
                };
            }
            else {
                return {
                    success: false,
                    error: "this cart alrady has a copoun",
                    code: 409
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

exports.calculateTotal = async (cart) => {
    let cartTotal = 0
    cart.items.forEach(item => {
        let price = parseFloat(item.book.price) - parseFloat(item.book.offer)
        price = price * item.quantity
        cartTotal += price
    });
    await Cart.findByIdAndUpdate({ _id: cart._id }, { total: cartTotal })
    let cartUpdate = await Cart.findById({ _id: cart._id })
    return {
        success: true,
        record: cartUpdate,
        code: 200
    };
}

exports.addItem = async (userId, bookId, quantity) => {
    const book = await getBook({ _id: bookId })
    let price = parseFloat(book.record.price) - parseFloat(book.record.offer)
    if (book.success && book.record.quantity > quantity) {
        const cart = await this.isExist({ userId: userId })
        const item = await this.isItemInCart(cart.record.items, bookId);
        let newBookQuantity = book.record.quantity - quantity
        try {
            if (item.success) {
                let newQuantity = parseInt(item.record.quantity) + parseInt(quantity)
                let itemTotal = price * newQuantity
                let foundItem = cart.record.items[item.index]
                foundItem.quantity = newQuantity
                foundItem.total = itemTotal

                let cartUpdate = await Cart.findOneAndUpdate({ userId: userId }, { items: cart.record.items })


                await updateBook(bookId, { quantity: newBookQuantity })
                cartUpdate = await this.calculateTotal(cart.record)

                return {
                    success: true,
                    record: cartUpdate.record,
                    code: 200
                };
            }
            else {

                await Cart.findOneAndUpdate({ userId: userId }, { $push: { items: { book: book.record, quantity: quantity, total: (price * quantity) } } })
                let cartUpdate = await Cart.findOne({ userId: userId })
                await updateBook(bookId, { quantity: newBookQuantity })
                cartUpdate = await this.calculateTotal(cart.record)
                return {
                    success: true,
                    record: cartUpdate.record,
                    code: 200
                }

            }
        }
        catch (err) {
            console.log(err);
            return {
                success: false,
                code: 500,
                error: "unexpected error"
            }
        }

    }
    else {
        return {
            success: false,
            error: book.error || "quntity Not sufficient",
            code: 404
        };
    }
}

exports.removeItem = async (userId, bookId, quantity) => {
    const book = await getBook({ _id: bookId })
    let price = parseFloat(book.record.price) - parseFloat(book.record.offer)
    if (book.success) {
        const cart = await this.isExist({ userId: userId })
        const item = await this.isItemInCart(cart.record.items, bookId);

        let newBookQuantity = book.record.quantity + quantity
        try {
            if (item.success) {
                if (item.record.quantity < quantity) {
                    return {
                        success: false,
                        message: "quantity in cart is less than quantity you want to remove",
                        code: 400
                    };
                }
                let newQuantity = parseInt(item.record.quantity) - parseInt(quantity)
                let itemTotal = price * newQuantity
                let foundItem = cart.record.items[item.index]
                foundItem.quantity = newQuantity
                foundItem.total = itemTotal
                await updateBook(bookId, { quantity: newBookQuantity })
                if (newQuantity == 0) {
                    await Cart.findOneAndUpdate({ userId: userId }, { $pull: { items: { book: item.record.book } } })
                    let cartUpdate = await Cart.findOne({ userId: userId })
                    cartUpdate = await this.calculateTotal(cartUpdate)
                    return {
                        success: true,
                        record: cartUpdate.record,
                        code: 200
                    };
                }

                await Cart.findOneAndUpdate({ userId: userId }, { items: cart.record.items })
                let cartUpdate = await Cart.findOne({ userId: userId })
                cartUpdate = await this.calculateTotal(cart.record)
                return {
                    success: true,
                    record: cartUpdate.record,
                    code: 200
                };
            }
            else {
                return {
                    success: false,
                    error: "item not found in cart",
                    code: 404
                };
            }
        }
        catch (err) {
            console.log(err);
            return {
                success: false,
                code: 500,
                error: "unexpected error"
            }
        }

    }
    else {
        return {
            success: false,
            error: book.error || "quntity Not sufficient",
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
    let i = -1
    const result = await arrayOfItems.find(element => {
        i++;
        if (element.book._id == bookId) { return element }
    });
    if (result) {
        return {
            success: true,
            record: result,
            index: i,
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
