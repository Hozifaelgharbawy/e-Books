const { findById } = require("./model");
let User = require("./model")
let bcrypt = require("bcrypt");


exports.list = async () => {
    let records = await User.find({}).select("-password")
    return records;
}

exports.get = async (id) => {
    if(id) return await this.isExist(id);
    else {
        return {
            success: false,
            code: 404,
            error: "User ID required"
        }
    }
}

exports.create = async (form) => {
    if (form) {
        const user = new User(form)
        await user.save();
        return {
            success: true,
            record: user,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404
        };
    }
}

exports.update = async (id, form) => {
    const user = await this.isExist(id);
    console.log(user);
    if(user.success) {
        let userUpdate = await User.findByIdAndUpdate({_id: id},  form)
        return {
            success: true,
            record: userUpdate,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: user.error,
            code: 404
        };
    }
}

exports.updateArray = async (id, form) => {
    const user = await this.isExist(id);
    console.log(user);
    if(user.success) {
        let userUpdate = await User.findByIdAndUpdate({_id: id},  {$addToSet: form})
        return {
            success: true,
            record: userUpdate,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: user.error,
            code: 404
        };
    }
}

exports.remove = async (id) => {
    const user = await this.isExist(id);
    if(id && user.success) {
        await User.findByIdAndDelete({_id: id})
        return {
            success: true,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404
        };
    }
}

exports.removeBook = async (id, book) => {
    const user = await this.isExist(id);
    if(id && user.success) {
        await User.findByIdAndUpdate({_id: id},  {$pull: book})
        return {
            success: true,
            record: user.record,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404
        };
    }
}

exports.isExist = async (value) => {
    const user = await User.findOne({ _id: value}).select("-password")
    if(user) {
        return {
            success: true,
            record: user,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404,
            error: "User not found"
        };
    }
}

exports.comparePassword = async (email, password) => {
    let user = await User.findOne({email})
    var match = await bcrypt.compare(password, user.password)
    if (match) {
    
        return {
            success: true,
            record: user,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404
        };
    }
}