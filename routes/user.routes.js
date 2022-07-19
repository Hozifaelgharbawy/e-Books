const app = require("express").Router();
let controller = require("../controller/app/user/user.controller");
let { registerValidation, loginValidation, updateUserValidation } = require("../validation/user.validation")
let validator = require("../helpers/common.validate")


app.post("/app/register", validator(registerValidation), controller.register)
app.post("/app/login", validator(loginValidation), controller.login)
app.put("/app/update/:id", validator(updateUserValidation), controller.update)
app.put("/app/addFavorite/:bookId/:userId", validator(updateUserValidation), controller.addFavorite)
app.get("/app/getFavorite/:id", controller.getFavorite)
app.delete("/app/deleteBookInFavorite/:bookId/:userId", controller.deleteBookInFavorite)
app.get("/app/getMyBooks/:id", controller.getMyBooks)

//--------------------------------
app.get("/app/getUserById/:id", controller.getUserById)
app.get("/app/getAllUser", controller.getAllUser)
app.delete("/app/delete/:id", controller.delete)
app.put("/app/addMyBook/:bookId/:userId", validator(updateUserValidation), controller.addMyBook)



module.exports = app