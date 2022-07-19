let joi = require("joi")



module.exports = {

    addCouponValidation : {

        body: joi.object().required().keys({

            sellerId: joi.string().empty().required().messages({
                "string.base": "please enter a valid seller Id",
                "any.required": "seller Id must be entered",
                "string.empty": "seller Id cannot be empty"
            }),
            code: joi.string().empty().required().messages({
                "string.base": "please enter a valid code",
                "any.required": "code must be entered",
                "string.empty": "code cannot be empty"
            }),
            quantity: joi.number().required().messages({
                "number.base": "please enter a valid quantity",
                "any.required": "quantity must be price"
            }),
            discount: joi.number().required().messages({
                "number.base": "please enter a valid quantity",
                "any.required": "total must be quantity"
            })
        })
    },

    updateCouponVaidation : {

        body: joi.object().required().keys({

            sellerId: joi.string().empty().optional().messages({
                "string.base": "please enter a valid seller Id",
                "any.required": "seller Id must be entered",
                "string.empty": "seller Id cannot be empty"
            }),
            code: joi.string().empty().optional().messages({
                "string.base": "please enter a valid code",
                "any.required": "code must be entered",
                "string.empty": "code cannot be empty"
            }),
            quantity: joi.number().optional().messages({
                "number.base": "please enter a valid quantity",
                "any.required": "quantity must be price"
            }),
            discount: joi.number().optional().messages({
                "number.base": "please enter a valid quantity",
                "any.required": "total must be quantity"
            })

        })
    }
    
}