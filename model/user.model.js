let mongoose = require("mongoose");


let userSchema = mongoose.Schema({
    fristName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    age: { type: Number },
    isActive: { type: Boolean, default: false },
    myBooks: [{
        type: mongoose.Types.ObjectId,
        ref: "Books"
    }],
    role: {
        type: String,
        enum: ["superAdmin", "admin", "seller", "customer"],
        default: "customer"
    }
})


let userModel = mongoose.model("users", userSchema)



module.exports = userModel;