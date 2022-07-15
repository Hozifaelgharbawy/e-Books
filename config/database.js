const mongoose = require("mongoose")


const connection = () => {
    return mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to database successfully!!");
    }).catch((err) => {
        console.log("MongoDB Error");
    })
}

module.exports = connection;