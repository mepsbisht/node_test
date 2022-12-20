const joi = require ('joi')

const validUser = joi.object({
    name:joi.string().required().messages({
        'string.base': `password should be a type of 'string'`,
        'string.empty': `password cannot be an empty field`,
        'string.min': `password should have a minimum length of 5`,
        'string.max': `password should have a maximum length of 40`,
        'any.required': `password is a required field`
      }),
    phone:joi.number().required(),
    userName:joi.string().lowercase().required(),
    password:joi.string().min(4).max(10).required().messages({
        'string.base': `password should be a type of 'string'`,
        'string.empty': `password cannot be an empty field`,
        'string.min': `password should have a minimum length of 4`,
        'string.max': `password should have a maximum length of 40`,
        'any.required': `password is a required field`
      }),

})

module.exports = {validUser}