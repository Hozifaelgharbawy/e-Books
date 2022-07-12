let User = require("../model/user.model")


exports.addNewUser = async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ massage: "Success!"})
}