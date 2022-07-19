let joi = require("joi")



module.exports = {

    addOrderValidation : {

        body: joi.object().required().keys({

            userId: joi.string().empty().required().messages({
                "string.base": "please enter a valid user Id",
                "any.required": "user Id must be entered",
                "string.empty": "user Id cannot be empty"
            }),
            cartId: joi.string().empty().required().messages({
                "string.base": "please enter a valid cart Id",
                "any.required": "cart Id must be entered",
                "string.empty": "cart Id cannot be empty"
            }),
            total: joi.number().required().messages({
                "number.base": "please enter a valid total",
                "any.required": "total must be price",
            }),           
            items: joi.alternatives().optional().try(
                joi.string().empty().required().messages({
                    "string.base": "please enter a valid items",
                    "any.required": "items must be entered",
                    "string.empty": "items cannot be empty"
                }),
                joi.array().min(2).required().items(joi.string().empty().required().messages({
                    "string.base": "please enter a valid items",
                    "any.required": "items must be entered",
                    "string.empty": "items cannot be empty"
                })).messages({
                    "array.base": "please enter a valid items",
                    "any.required": "you have to enter at least one items",
                    "array.min": "you have to enter at least one items"
                })
            )
        })
    },

    updateOrderVaidation : {

        body: joi.object().required().keys({

            userId: joi.string().empty().optional().messages({
                "string.base": "please enter a valid user Id",
                "string.empty": "user Id cannot be empty"
            }),
            cartId: joi.string().empty().optional().messages({
                "string.base": "please enter a valid cart Id",
                "string.empty": "cart Id cannot be empty"
            }),
            total: joi.number().optional().messages({
                "number.base": "please enter a valid total"
            }),           
            items: joi.alternatives().optional().try(
                joi.string().empty().required().messages({
                    "string.base": "please enter a valid items",
                    "any.required": "items must be entered",
                    "string.empty": "items cannot be empty"
                }),
                joi.array().min(2).required().items(joi.string().empty().required().messages({
                    "string.base": "please enter a valid items",
                    "any.required": "items must be entered",
                    "string.empty": "items cannot be empty"
                })).messages({
                    "array.base": "please enter a valid items",
                    "any.required": "you have to enter at least one items",
                    "array.min": "you have to enter at least one items"
                })
            )

        })
    }
    
}