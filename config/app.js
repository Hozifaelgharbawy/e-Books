let express = require("express");
const app = express();
require("dotenv").config();

let path = require("path")
let staticFiles = path.join(__dirname, 'public')
let bodyParser = require("body-parser")
let connection = require("./database")
let cors = require("cors")
let { handelCorsPlicy } = require("../helpers/cors")
let routes = require("../routes/index.routes")
let AuthRoutes = require("../routes/auth.routes")
const sessionAuth = require("../helpers/session.auth")
let endPoints = require("../helpers/endPoints")
let checkRole = require("../utils/checkRole")
let { checkSession } = require("../utils/checkAuth.util")

connection();
app.use(express.static(staticFiles))
//app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());
app.use(handelCorsPlicy);
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
app.use(sessionAuth)
app.use(AuthRoutes)
app.use(checkSession)
//app.use(checkRole(endPoints))
app.use(routes)



app.listen(process.env.PORT, console.log(`Server is up and runing on port ${process.env.PORT}!`))