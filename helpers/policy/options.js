const roles = require("../roles");
const adminPolicy = require("./admin.policy");
const sellerPolicy = require("./seller.policy");
const superAdminPolicy = require("./superAdmin.policy");
const customerPolicy = require("./customer.policy");

const opts = {
    [roles.SUPER_ADMIN] : {can : superAdminPolicy},
    [roles.ADMIN] : {can : adminPolicy},
    [roles.SELEER] : {can : sellerPolicy},
    [roles.CUSTOMER] : {can : customerPolicy}
}

module.exports = opts;