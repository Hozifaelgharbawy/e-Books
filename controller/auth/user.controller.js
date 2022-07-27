let { create, comparePassword, update } = require("../../modules/user/repo")
let { sendMail } = require("../../utils/email.util")
let day = 3600000 *24


exports.login = async (req, res) => {
    let { email, password } = req.body;
    const result = await comparePassword(email, password)
    console.log(result);
    if(result.record.isActive == false) return res.status(403).json({message: "Check your Email for activation link!"})
    if (result.success) {
        req.session.cookie.expires = new Date(Date.now() + day);
        req.session.cookie.maxAge = day;
        req.session.user = result.record
        await req.session.save();
        res.status(result.code).json({ massage: "Success!"})
    }
    else {
        res.status(result.code).json({ massage: "incorrect password" })
    }
}

exports.register = async (req, res) => {
    const result = await create(req.body);
    console.log(result)
    let randomActivationToken = Math.random() * 1000000;
    req.session.user = result.record;
    req.session.activationToken = randomActivationToken
    await req.session.save();
    let activationLink = `http://localhost:3000/activateUser/${randomActivationToken}`
    let reciever = req.body.email;
    let subject = "Activate Your Account!";
    let text = "You have created a new account, please click this link to activate your account!";
    let html = `<a>${activationLink}</a>`
    await sendMail(reciever, subject, text, html)
    res.status(result.code).json({ user: result.record })
}

exports.generateRecaaveryCode = async (req, res) => {
    let randomCode = Math.random() * 1000000;
    req.session.randomCode = randomCode
    await req.session.save();

    let reciever = req.body.email;
    let subject = "Reset Your Password";
    let text = "You have forgotten your password, here is your recovery code";
    let html = `<h1>${randomCode}</h1>`
    await sendMail(reciever, subject, text, html)
    res.status(201).json({ massage: "Success!"})
}

exports.checkRecoveryCode = async (req, res) => {
    recieveryCode = req.params.code
    if(recieveryCode == req.session.randomCode) res.status(200).json({ massage: "Success!" })
    else return res.status(400).json({ massage: "Incorrect Code"}) 
}

exports.activateUser = async(req, res) => {
    let token = req.params.token;
    if(token == req.session.activationToken) {
        await update(req.session.user._id, { isActive: true})

        res.status(201).json({ massage: "Success!" })            
    }
    else res.status(400).json({ massage: "Incorrect Token"}) 
}

exports.updateUser = async (req, res) => {
    const result = await update(req.params.id, req.body)
    if (result.success) {
        res.status(result.code).json({ massage: "Sucsses!", user: result.record })
    }
    else {
        res.status(result.code).json({ massage: "Error!", error: result.error })
    }
}