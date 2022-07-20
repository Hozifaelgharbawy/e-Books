const app = require("express").Router();
let controller = require("../controller/app/user/user.controller");
let adminController = require("../controller/admin/user/user.controller");
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
app.get("/admin/getUserById/:id", adminController.getUserById)
app.get("/admin/getAllUser", adminController.getAllUser)
app.delete("/admin/delete/:id", adminController.delete)
app.put("/admin/upgradeRole/:id", validator(updateUserValidation), adminController.upgradeRole)


module.exports = app