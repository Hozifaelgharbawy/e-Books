let Order = require("./model")
let { get, flush } = require("../cart/repo")
let { addBookToMyBooks } = require("../user/repo")
let getSeller = require("../user/repo").get


exports.list = async (filter) => {
    let records = await Order.find(filter)
    return {
        records,
        code: 200
    }
}

exports.get = async (filter) => {
    if (filter) return await this.isExist(filter);
    else {
        return {
            success: false,
            code: 404
        }
    }
}

exports.create = async (cartId) => {
    let cart = await get({ _id: cartId })
    if (cart.success) {
        const order = new Order({ userId: cart.record.userId, cartId: cart.record._id, items: cart.record.items, total: cart.record.total })
        await order.save();

        await order.items.forEach(element => {
            addBookToMyBooks({ _id: cart.record.userId }, element.book)
        });
        await flush({ _id: cartId })
        return {
            success: true,
            record: order,
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

exports.getAllOrdersToSeller = async (sellerId) => {
    let seller = await getSeller({ _id: sellerId })
    let orders = await Order.find({})
    let arr = []
    await orders.find(element => {
        element.items.find(item => {
            seller.record.myBooks.find(book => {
                if (item.book = book) arr.push({ userId: element.userId, book: book, quantity: item.quantity })
            });
        });
    });
    return {
        code: 200,
        records: arr,
        success: true
    }
}

exports.getAllOrdersToBook = async (bookId) => {
    let orders = await Order.find({})
    let arr = []
    await orders.find(element => {
        element.items.find(item => {
            if (item.book = bookId) arr.push({ userId: element.userId, book: bookId, quantity: item.quantity })
        });
    });
    return {
        code: 200,
        records: arr,
        success: true
    }
}

exports.isExist = async (value) => {
    const order = await Order.findOne({ _id: value });
    if (order) {
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
