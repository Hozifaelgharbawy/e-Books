const endPoints = require("../endPoints")

module.exports = [
    endPoints.GET_USER_MYBOOKS,

    endPoints.GET_ALL_ORDER_TO_SELLER,
    endPoints.GET_ALL_ORDER_TO_BOOK,

    endPoints.ADD_COUPON,
    endPoints.DELETE_COUPON,
    endPoints.UPDATE_COUPON,
    endPoints.GET_COUPON,
    endPoints.GET_MY_COUPONS,

    endPoints.ADD_NEW_BOOK,
    endPoints.DELETE_BOOK,
    endPoints.UPDATE_BOOK,
    endPoints.GET_BOOK
]