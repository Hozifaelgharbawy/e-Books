let express = require("express");
const app = express();

let userRoutes = require("./user.routes")
let bookRoutes = require("./book.routes")
let couponRoutes = require("./coupon.routes")
let orderRoutes = require("./order.routes")



app.use(userRoutes)
app.use(bookRoutes)
app.use(couponRoutes)
app.use(orderRoutes)


module.exports = app