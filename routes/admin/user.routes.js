const app = require("express").Router();
let controller = require("../../controller/admin/user/user.controller");
let authController = require("../../controller/auth/user.controller");
let { registerValidation, loginValidation, updateUserValidation } = require("../../validation/user.validation")
let validator = require("../../helpers/common.validate")
let { checkSession } = require("../../utils/checkAuth.util")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.post("/user/register", validator(registerValidation), authController.register)
app.post("/user/login", validator(loginValidation), authController.login)
app.put("/user/updateUser/:id", validator(updateUserValidation), authController.updateUser)
app.get("/user/:id", [checkSession, checkRole(endPoints)], controller.getUserById)
app.get("/user", [checkSession, checkRole(endPoints)], controller.getAllUser)
app.delete("/user/:id", [checkSession, checkRole(endPoints)], controller.deleteUser)
app.put("/user/upgradeRole/:id", [validator(updateUserValidation), checkRole(endPoints)], controller.upgradeRole)


module.exports = app