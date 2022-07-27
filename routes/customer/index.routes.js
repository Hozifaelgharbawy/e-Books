let express = require("express");
const app = express();

let userRoutes = require("./user.routes")
let bookRoutes = require("./book.routes")
let cartRoutes = require("./cart.routes")
let orderRoutes = require("./order.routes")



app.use(userRoutes)
app.use(bookRoutes)
app.use(cartRoutes)
app.use(orderRoutes)

module.exports = app