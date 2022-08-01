let User = require("./model")
let bcrypt = require("bcrypt");
const { findOne } = require("./model");



exports.list = async (filter) => {
    let records = await User.find(filter).select("-password");
    return records;
}

exports.get = async (filter) => {
    if (filter) return await this.isExist(filter);
    else {
        return {
            success: false,
            code: 404,
            error: "User ID required"
        }
    }
}

exports.create = async (email, form) => {
    const user = await this.isExist({ email: email });
    if (!user.success) {
        const createUser = new User(form)
        await createUser.save();
        return {
            success: true,
            record: createUser,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: "User already exists",
            code: 404
        };
    }
}

exports.update = async (id, form) => {
    const user = await this.isExist({ _id: id });
    console.log(user);
    if (user.success) {
        let userUpdate = await User.findByIdAndUpdate({ _id: id }, form).select("-password")
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

exports.addBookToFavorite = async (filter, bookId) => {
    const user = await this.isExist(filter);
    if (filter && user.success) {
        const arr = await this.isElementInArray(user.record.favorite, bookId)
        console.log(user.record.favorite, bookId);
        if (!arr.success) {
            await User.findByIdAndUpdate(filter, { $push: {favorite: bookId }})
            const updateUser = await this.isExist(filter);
            return {
                success: true,
                record: updateUser.record,
                code: 200
            };
        }
        else {
            return {
                success: false,
                error: "Book already in favorite",
                code: 200
            };
        }
    }
    else {
        return {
            success: false,
            error: user.error,
            code: 404
        };
    }
}

exports.removeBookFromFavorite = async (filter, bookId) => {
    const user = await this.isExist(filter);
    if (filter && user.success) {
        const arr = await this.isElementInArray(user.record.favorite, bookId)
        console.log(user.record.favorite, bookId);
        if (arr.success) {
            await User.findByIdAndUpdate(filter, { $pull: {favorite: bookId }})
            return {
                success: true,
                record: user.record,
                code: 200
            };
        }
        else {
            return {
                success: false,
                error: "Book Not in favorite",
                code: 404
            };
        }
    }
    else {
        return {
            success: false,
            error: user.error,
            code: 404
        };
    }


}

exports.addBookToMyBooks = async (filter, bookId) => {
    const user = await this.isExist(filter);
    if (filter && user.success) {
        const arr = await this.isElementInArray(user.record.myBooks, bookId)
        console.log(user.record.myBooks, bookId);
        if (!arr.success) {
            await User.findByIdAndUpdate(filter, { $addToSet: {myBooks: bookId }})
            return {
                success: true,
                record: user.record,
                code: 200
            };
        }
        else {
            return {
                success: false,
                error: "Book already in your Books",
                code: 200
            };
        }
    }
    else {
        return {
            success: false,
            error: user.error,
            code: 404
        };
    }
}

exports.removeBookFromMyBooks = async (filter, bookId) => {
    const user = await this.isExist(filter);
    if (filter && user.success) {
        const arr = await this.isElementInArray(user.record.myBooks, bookId)
        console.log(user.record.myBooks, bookId);
        if (arr.success) {
            await User.findByIdAndUpdate(filter, { $pull: {myBooks: bookId }})
            return {
                success: true,
                record: user.record,
                code: 200
            };
        }
        else {
            return {
                success: false,
                error: "book that is not in your books",
                code: 404
            };
        }
    }
    else {
        return {
            success: false,
            error: user.error,
            code: 404
        };
    }


}

exports.isElementInArray = async (arrayOfElement, bookId) => {
    let result = await arrayOfElement.find((i => i == bookId))
    console.log(result);
    if (result) {
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

exports.remove = async (id) => {
    const user = await this.isExist({ _id: id });
    if (id && user.success) {
        await User.findByIdAndDelete({ _id: id })
        return {
            success: true,
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

exports.isExist = async (filter) => {
    const user = await User.findOne(filter).select("-password")
    if (user) {
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
    let user = await User.findOne({ email })
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