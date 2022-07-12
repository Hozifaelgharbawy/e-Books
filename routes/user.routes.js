const app = require("express").Router();
let controller = require("../controller/user.controller");


app.post("/addNewUser", controller.addNewUser)



module.exports = app