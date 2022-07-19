const app = require("express").Router();
let controller = require("../controller/app/cart/cart.controller");
let { createCartValidation, addBookInCartVaidation } = require("../validation/cart.validation")
let validator = require("../helpers/common.validate")



app.post("/app/createCart", validator(createCartValidation), controller.createCart)
app.get("/app/getMyCart/:userId", controller.getMyCart)

//--------------------------------
app.put("/app/addBookInCart/:userId", validator(addBookInCartVaidation), controller.addBookInCart)
app.delete("/app/deleteBookInCart/:bookId/:userId", controller.deleteBookInCart)


module.exports = app