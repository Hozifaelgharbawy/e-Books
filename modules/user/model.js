let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let saltrouds = 5;


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

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, saltrouds) ;
    next();
})

let userModel = mongoose.model("users", userSchema)



module.exports = userModel;