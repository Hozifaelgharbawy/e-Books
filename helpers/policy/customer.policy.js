const endPoints = require("../endPoints")

module.exports = [
    endPoints.GET_USER_FAVORITE,
    endPoints.ADD_BOOK_TO_FAVORITE,
    endPoints.DELETE_BOOK_FROM_FAVORITE,
    endPoints.GET_USER_MYBOOKS,
    endPoints.CREATE_ORDER,
    endPoints.DELETE_ORDER,
    endPoints.UPDATE_ORDER,
    endPoints.GET_ORDER_BY_ID,
    endPoints.GET_MY_CART,
    endPoints.UPDATE_CART,
    endPoints.ADD_BOOK_IN_CART,
    endPoints.REMOVE_ITEMS,
    endPoints.DELETE_BOOK_IN_CART,
    endPoints.GET_ALL_BOOK,
    endPoints.GET_BOOK_BY_ID
]