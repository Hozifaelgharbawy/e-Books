let joi = require("joi")


module.exports = {

    addNewBookValidation : {

        body: joi.object().required().keys({

            title: joi.string().empty().required().messages({
                "string.base": "please enter a valid title",
                "any.required": "title must be entered",
                "string.empty": "title cannot be empty"
            }),
            
            description: joi.string().empty().required().messages({
                "string.base": "please enter a valid description",
                "any.required": "description must be entered",
                "string.empty": "description cannot be empty"
            }),

            fileUrl: joi.string().pattern(new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)).empty().required().messages({
                "string.base" : "please enter a valid fileUrl",
                "any.required" : "fileUrl must be entered",
                "string.empty" : "fileUrl cannot be empty",
                "string.pattern.base" : "please enter a valid URL"
            }),

            coverUrl: joi.string().pattern(new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)).empty().required().messages({
                "string.base" : "please enter a valid coverUrl",
                "any.required" : "coverUrl must be entered",
                "string.empty" : "coverUrl cannot be empty",
                "string.pattern.base" : "please enter a valid URL"
            }),

            demo: joi.string().pattern(new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)).empty().required().messages({
                "string.base" : "please enter a valid demo",
                "any.required" : "demo must be entered",
                "string.empty" : "demo cannot be empty",
                "string.pattern.base" : "please enter a valid URL"
            }),

            price: joi.number().required().messages({
                "number.base": "please enter a valid price",
                "any.required": "age must be price",
            }),

            offer: joi.number().optional().messages({
                "number.base": "please enter a valid offer"
            }),
            
            author: joi.alternatives().required().try(
                joi.string().empty().required().messages({
                    "string.base": "please enter a valid author",
                    "any.required": "author must be entered",
                    "string.empty": "author cannot be empty"
                }),
                joi.array().min(2).required().items(joi.string().empty().required().messages({
                    "string.base": "please enter a valid author",
                    "any.required": "author must be entered",
                    "string.empty": "author cannot be empty"
                })).messages({
                    "array.base": "please enter a valid authors",
                    "any.required": "you have to enter at least one author",
                    "array.min": "you have to enter at least one author"
                })
            ).messages({
                "any.required": "you have to enter at least one author"
            }),
            category: joi.string().empty().required().messages({
                "string.base": "please enter a valid category",
                "any.required": "category must be entered",
                "string.empty": "category cannot be empty"
            }),
        })
    },

    updateBookVaidation : {

        body: joi.object().required().keys({

            title: joi.string().empty().optional().messages({
                "string.base": "please enter a valid title",
                "string.empty": "title cannot be empty"
            }),
            
            description: joi.string().empty().optional().messages({
                "string.base": "please enter a valid description",
                "string.empty": "description cannot be empty"
            }),

            fileUrl: joi.string().pattern(new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)).empty().optional().messages({
                "string.base" : "please enter a valid fileUrl",
                "string.empty" : "fileUrl cannot be empty",
                "string.pattern.base" : "please enter a valid URL"
            }),

            coverUrl: joi.string().pattern(new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)).empty().optional().messages({
                "string.base" : "please enter a valid coverUrl",
                "string.empty" : "coverUrl cannot be empty",
                "string.pattern.base" : "please enter a valid URL"
            }),

            demo: joi.string().pattern(new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)).empty().optional().messages({
                "string.base" : "please enter a valid demo",
                "string.empty" : "demo cannot be empty",
                "string.pattern.base" : "please enter a valid URL"
            }),

            price: joi.number().optional().messages({
                "number.base": "please enter a valid price"
            }),

            offer: joi.number().optional().messages({
                "number.base": "please enter a valid offer"
            }),
            
            author: joi.alternatives().optional().try(
                joi.string().empty().required().messages({
                    "string.base": "please enter a valid author",
                    "any.required": "author must be entered",
                    "string.empty": "author cannot be empty"
                }),
                joi.array().min(2).required().items(joi.string().empty().required().messages({
                    "string.base": "please enter a valid author",
                    "any.required": "author must be entered",
                    "string.empty": "author cannot be empty"
                })).messages({
                    "array.base": "please enter a valid authors",
                    "any.required": "you have to enter at least one author",
                    "array.min": "you have to enter at least one author"
                })
            ),
            category: joi.string().empty().optional().messages({
                "string.base": "please enter a valid category",
                "string.empty": "category cannot be empty"
            }),

        })
    }
    
}