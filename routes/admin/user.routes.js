const app = require("express").Router();
let controller = require("../../controller/admin/user/user.controller");

let { updateUserValidation } = require("../../validation/user.validation")
let validator = require("../../helpers/common.validate")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utils/checkRole")

app.get("/user/getUser", checkRole(endPoints.GET_USER), controller.getUser)
app.get("/user/getAllUsers", checkRole(endPoints.GET_ALL_USERS), controller.getAllUsers)
app.delete("/user/:id", checkRole(endPoints.DELETE_USER), controller.deleteUser)
app.put("/user/upgradeRole/:id", [checkRole(endPoints.UPGRADE_ROLE),validator(updateUserValidation)], controller.upgradeRole)


module.exports = app