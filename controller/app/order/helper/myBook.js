let { update } = require("../../../../modules/user/repo")


exports.addMyBook = async (bookId, userId) => {
    const result = await update(userId, { myBooks: bookId })
    console.log(result.success.myBook)
}