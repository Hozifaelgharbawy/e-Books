let express = require("express");
const app = express();

let sellerRoutes = require("./seller/index.routes")
let customerRoutes = require("./customer/index.routes")
let adminRoutes = require("./admin/index.routes")
let authController = require("../controller/auth/user.controller");

app.post("/generateRecaaveryCode", authController.generateRecaaveryCode)
app.get("/checkRecoveryCode/:code", authController.checkRecoveryCode)
app.get("/activateUser/:token", authController.activateUser)
app.use("/api/v1/seller", sellerRoutes)
app.use("/api/v1/customer", customerRoutes)
app.use("/api/v1/admin", adminRoutes)

module.exports = app