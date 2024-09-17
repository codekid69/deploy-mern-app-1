const joi = require('joi');

const signupValidation = (req, res, next) => {
    // schema for req (in object form)
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    });
    // validating the req coming and destructuring the error '{error}'
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error })
    }

    // calling next function if the validation success
    next();
}

const loginValidation = (req, res, next) => {
    // schema for req (in object form)
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    });
    // validating the req coming and destructuring the error '{error}'
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error })
    }

    // calling next function if the validation success
    next();
}

module.exports={
    signupValidation,
    loginValidation
}