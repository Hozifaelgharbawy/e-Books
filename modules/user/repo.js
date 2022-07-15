const { findById } = require("./model");
let User = require("./model")


exports.list = async () => {
    let allUser = await User.find({})
    return allUser;
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
            user: user,
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
    if(id && user.success) {
        let userUpdate = await User.findByIdAndUpdate({_id: id}, form)
        return {
            success: true,
            user: userUpdate,
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
        await User.deleteOne(book)
        return {
            success: true,
            user: user,
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
    const user = await User.findOne({ _id: value})
    if(user) {
        return {
            success: true,
            user: user,
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
    if (password == user.password) {
        return {
            success: true,
            user: user,
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