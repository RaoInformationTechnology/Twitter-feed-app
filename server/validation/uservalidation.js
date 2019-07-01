const Joi = require('joi');

module.exports.userdata = (req, res, next) => {
    const userschema = Joi.object().keys({
        name: Joi.string().required(),
        username: Joi.string().required(),
        photo: Joi.string().required(),
        email: Joi.string().required(),
        hashtag: Joi.string().required()


    })

    Joi.validate(
        console.log("request===="),
        req.body,
        userschema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}

module.exports.reverseuserdata = (req, res, next) => {
    const userreverseschema = Joi.object().keys({
        name: Joi.string().required(),
        username: Joi.string().required(),
        photo: Joi.string().required(),
        email: Joi.string().required(),
        hashtag: Joi.string().required()


    })

    Joi.validate(
        console.log("request===="),
        req.body,
        userreverseschema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}


