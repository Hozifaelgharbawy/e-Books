const app = require("express").Router();
let authController = require("../controller/auth/user.controller");
let { registerValidation, loginValidation, updateUserValidation } = require("../validation/user.validation")
let validator = require("../helpers/common.validate")


app.post("/api/v1/user/generateRecaaveryCode", authController.generateRecaaveryCode)
app.get("/api/v1/user/checkRecoveryCode/:code", authController.checkRecoveryCode)
app.get("/api/v1/user/activateUser/:token", authController.activateUser)
app.post("/api/v1/user/register", validator(registerValidation), authController.register)
app.post("/api/v1/user/login", validator(loginValidation), authController.login)
app.put("/api/v1/user/:id", validator(updateUserValidation), authController.updateUser)

module.exports = app