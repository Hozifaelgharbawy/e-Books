const { allow } = require("joi");


exports.handelCorsPlicy = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    const allowedMathods = ["POST", "GET", "PUT", "DELETE"];
    res.header("Access-Control-Allow-Methods", allowedMathods);

    if(allowedMathods.includes(req.method)) next();
    else return res.status(403).json({ message: "Blocked By CORS Policy!" })
}