let joi = require("joi")



module.exports = {

    addBookInCartVaidation : {

        body: joi.object().required().keys({

            userId: joi.string().empty().optional().messages({
                "string.base": "please enter a valid user Id",
                "any.required": "user Id must be entered",
                "string.empty": "user Id cannot be empty"
            }),

            total: joi.number().optional().messages({
                "number.base": "please enter a valid total"
            }),

            promoCode: joi.string().empty().optional().messages({
                "string.base": "please enter a valid promoCode",
                "string.empty": "promoCode Id cannot be empty"
            }),
            
            items: joi.alternatives().optional().try(
                joi.object().empty().required().messages({
                    "object.base": "please enter a valid items",
                    "any.required": "items must be entered",
                    "object.empty": "items cannot be empty"
                }),
                joi.array().required().items(joi.object().empty().required().messages({
                    "object.base": "please a enter a valid items",
                    "any.required": "items must be entered",
                    "object.empty": "items cannot be empty"
                })).messages({
                    "array.base": "please s enter a valid items",
                    "any.required": "you have to enter at least one items",
                    "array.min": "you have to enter at least one items"
                })
            )

        })
    }
    
}