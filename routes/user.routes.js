const app = require("express").Router();
let controller = require("../controller/app/user/user.controller");
let { registerValidation, loginValidation, updateUserValidation } = require("../validation/user.validation")
let validator = require("../helpers/common.validate")




app.post("/app/register", validator(registerValidation), controller.register)
app.get("/app/getUserById/:id", controller.getUserById)
app.get("/app/getAllUser", controller.getAllUser)
app.post("/app/login", validator(loginValidation), controller.login)
app.put("/app/update/:id", validator(updateUserValidation), controller.update)
app.put("/app/addFavorite/:bookId/:userId", controller.addFavorite)
app.get("/app/getFavorite/:id", controller.getFavorite)
app.put("/app/addMyBook/:bookId/:userId", controller.addMyBook)
app.delete("/app/delete/:id", controller.delete)
app.delete("/app/deleteBookInFavorite/:bookId/:userId", controller.deleteBookInFavorite)
app.get("/app/getMyBooks/:id", controller.getMyBooks)



module.exports = app