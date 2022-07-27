let express = require("express");
const app = express();

let userRoutes = require("./user.routes")
let bookRoutes = require("./book.routes")
let orderRoutes = require("./order.routes")
let cartRoutes = require("./cart.routes")
let couponRoutes = require("./coupon.routes")

app.use(cartRoutes)
app.use(userRoutes)
app.use(bookRoutes)
app.use(orderRoutes)
app.use(couponRoutes)

module.exports = app