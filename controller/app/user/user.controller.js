let { get, create, list, comparePassword, update, remove, removeBook} = require("../../../modules/user/repo")
let Book = require("../../../modules/book/repo")

exports.login = async(req, res) => {
    let {email, password} = req.body;
    const result = await comparePassword(email,password)
    console.log(result);
    if(result.success) {
        res.status(200).json({ massage: "Success!"})
    }
    else {
        res.status(400).json({ massage: "incorrect password"})
    }
}

exports.register = async(req, res) => {
    const result = await create(req.body);
    console.log(result)
    res.status(200).json({ user: result.user})
}

exports.update = async(req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(200).json({ massage: "Sucsses!", user: result.user})
    }
    else {
        res.status(404).json({ massage: "Error!", error: result.error})
    }
}

exports.getMyBooks = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(200).json({ myBooks: result.user.myBooks})
}

exports.getFavorite = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(200).json({ Favorite: result.user.favorite})
}

exports.addFavorite = async(req, res) => {
    const myBook = await Book.get(req.params.bookId)
    console.log(myBook.book)
    const result = await update(req.params.userId, {favorite: myBook.book})
    console.log(result)
    res.status(200).json({ Favorite: result.user.favorite})
}

exports.deleteBookInFavorite = async(req, res) => {
    const myBook = await Book.get(req.params.bookId)
    console.log(myBook.book)
    const result = await removeBook(req.params.userId, {favorite: myBook.book})
    console.log(result)
    if(result.success) {
        res.status(200).json({ Favorite: result.user.favorite})
    }
    else{
        res.status(200).json({ message: "Book Not in favorite" })
    }
}




//------------------------------------[]
exports.getUserById = async(req, res) => {
    const result = await get(req.params.id)
    console.log(result)
    res.status(200).json({ user: result.user})
}
exports.getAllUser = async(req, res) => {
    const result = await list();
    console.log(result)
    res.status(200).json({ user: result})
}
exports.delete = async(req, res) => {
    const result = await remove(req.params.id)
    if (result.success) {
        res.status(200).json({ massage: "Sucsses!" })
    }
    else {
        res.status(404).json({ massage: "Error!", error: result.error})
    }
}
exports.addMyBook = async(req, res) => {
    const myBook = await Book.get(req.params.bookId)
    console.log(myBook.book)
    const result = await update(req.params.userId, {myBooks: myBook.book})
    console.log(result)
    res.status(200).json({ myBooks: result.user.myBooks})
}