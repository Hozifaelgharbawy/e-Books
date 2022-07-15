let mongoose = require("mongoose");


let userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    age: { type: Number },
    isActive: { type: Boolean, default: false },
    myBooks: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    role: {
        type: String,
        enum: ["superAdmin", "admin", "seller", "customer"],
        default: "customer"
    },
    favorite: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }]
})


let userModel = mongoose.model("users", userSchema)



module.exports = userModel;