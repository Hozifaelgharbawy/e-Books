let joi = require("joi")


module.exports = {

    registerValidation : {
        body: joi.object().required().keys({
            name: joi.string().empty().required().pattern(new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base": "please enter a valid name",
                "any.required": "name must be entered",
                "string.empty": "name cannot be empty",
                "string.pattern.base": "please enter a valid name "
            }),
            email: joi.string().email({minDomainSegments: 2, tlds: {allow: ['com']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "email must be entered",
                "string.empty" : "email cannot be empty"
            }),
            password: joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "password must be entered",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z, a-z, 1-9, special character",
            }),
            userName: joi.string().empty().alphanum().required().min(5).max(20).messages({
                "string.base": "please enter a valid user name",
                "any.required": "user name must be entered",
                "string.empty": "user name cannot be empty",
                "string.alphanum": "please enter a valid user name",
                "string.min": "number of character must be between 5 and 20",
                "string.max": "number of character must be between 5 and 20"
            }),
            age: joi.number().required().min(18).max(100).messages({
                "string.base": "please enter a valid age",
                "any.required": "age must be entered",
                "string.min": "the age must be between 18 and 100",
                "string.max": "the age must be between 18 and 100"
            }),
            isActive: joi.boolean().optional().messages({
                "boolean.base": "please enter a valid isActive status"
            }),
            role: joi.string().optional().messages({
                "string.base": "please enter a valid role (seller or customer)"
            })
        })
    },


    loginValidation : {
        body: joi.object().required().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow: ['com']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "email must be entered",
                "string.empty" : "email cannot be empty"
            }),
            password: joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "password must be entered",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z, a-z, 1-9, special character",
            })
        })
    },


    updateUserValidation:{
        body: joi.object().required().keys({
            name: joi.string().empty().optional().pattern(new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base": "please enter a valid name",
                "string.empty": "name cannot be empty",
                "string.pattern.base": "please enter a valid name "
            }),
            email: joi.string().email({minDomainSegments: 2, tlds: {allow: ['com']}}).empty().optional().messages({
                "string.email" : "please enter a valid email",
                "string.empty" : "email cannot be empty"
            }),
            password: joi.string().empty().optional().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z, a-z, 1-9, special character",
            }),
            userName: joi.string().empty().alphanum().optional().min(5).max(20).messages({
                "string.base": "please enter a valid user name",
                "string.empty": "user name cannot be empty",
                "string.alphanum": "please enter a valid user name",
                "string.min": "number of character must be between 5 and 20",
                "string.max": "number of character must be between 5 and 20"
            }),
            age: joi.number().optional().min(18).max(100).messages({
                "string.base": "please enter a valid age",
                "string.min": "the age must be between 18 and 100",
                "string.max": "the age must be between 18 and 100"
            }),
            isActive: joi.boolean().optional().messages({
                "boolean.base": "please enter a valid isActive status"
            }),
            role: joi.string().optional().messages({
                "string.base": "please enter a valid role (seller or customer)"
            })
        })
    }

}