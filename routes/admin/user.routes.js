const app = require("express").Router();
let controller = require("../../controller/admin/user/user.controller");

let { updateUserValidation } = require("../../validation/user.validation")
let validator = require("../../helpers/common.validate")
let { checkSession } = require("../../utils/checkAuth.util")


app.get("/user/getUser", checkSession, controller.getUser)
app.get("/user/getAllUsers", checkSession, controller.getAllUsers)
app.delete("/user/:id", checkSession, controller.deleteUser)
app.put("/user/upgradeRole/:id", validator(updateUserValidation), controller.upgradeRole)


module.exports = app