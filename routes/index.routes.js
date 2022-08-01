let express = require("express");
const app = express();
let sellerRoutes = require("./seller/index.routes")
let customerRoutes = require("./customer/index.routes")
let adminRoutes = require("./admin/index.routes")
let authController = require("../controller/auth/user.controller");
let { updateUserValidation } = require("../validation/user.validation")
let validator = require("../helpers/common.validate")



app.put("/api/v1/user/updateUser/:id", validator(updateUserValidation), authController.updateUser)
app.use("/api/v1/seller", sellerRoutes)
app.use("/api/v1/customer", customerRoutes)
app.use("/api/v1/admin", adminRoutes)

module.exports = app