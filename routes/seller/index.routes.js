let express = require("express");
const app = express();

let userRoutes = require("./user.routes")
let bookRoutes = require("./book.routes")
let couponRoutes = require("./coupon.routes")



app.use(userRoutes)
app.use(bookRoutes)
app.use(couponRoutes)

module.exports = app