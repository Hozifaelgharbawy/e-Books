let express = require("express");
const app = express();
require("dotenv").config();

let path = require("path")
let staticFiles = path.join(__dirname, 'public')
let bodyParser = require("body-parser")
let connection = require("./conection/db.conection")
let userRoutes = require("./routes/user.routes");
let bookRoutes = require("./routes/book.routes")


connection();
app.use(express.static(staticFiles))
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.json())
app.use(userRoutes)
app.use(bookRoutes)


app.listen(process.env.PORT, console.log(`Server is up and runing on port ${process.env.PORT}!`))