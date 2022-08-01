let { getAllOrdersToSeller,getAllOrdersToBook } = require("../../../../modules/order/repo");


exports.getAllOrdersToSeller = async (req, res) => {
    const result = await getAllOrdersToSeller(req.params.sellerId)
    console.log(result)
    res.status(result.code).json({ Orders: result.records })
}

exports.getAllOrdersToBook = async (req, res) => {
    const result = await getAllOrdersToBook(req.params.bookId)
    console.log(result)
    res.status(result.code).json({ Orders: result.records })
}