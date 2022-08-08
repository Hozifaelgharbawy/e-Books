const endPoints = require("../endPoints")

module.exports = [
    endPoints.GET_USER_FAVORITE,
    endPoints.ADD_BOOK_TO_FAVORITE,
    endPoints.DELETE_BOOK_FROM_FAVORITE,
    endPoints.GET_USER_MYBOOKS,

    endPoints.CREATE_ORDER,
    endPoints.GET_MY_ORDERS,


    endPoints.GET_MY_CART,
    endPoints.APPLY_COUPON,
    endPoints.ADD_BOOK_IN_CART,
    endPoints.DELETE_BOOK_IN_CART,

    endPoints.GET_ALL_BOOKS,
    endPoints.GET_BOOK
]