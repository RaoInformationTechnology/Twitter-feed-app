const Joi = require('joi');

module.exports.addhashtag = (req, res, next) => {
    const addhashschema = Joi.object().keys({
        name: Joi.string().required(),
        id: Joi.string().required(),
        count: Joi.number().required(),
        email: Joi.string().required(),

    })

    Joi.validate(
        console.log("request===="),
        req.body,
        addhashschema,
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


module.exports.deletehashtag = (req, res, next) => {
    const deletehashschema = Joi.object().keys({
        name: Joi.string().required(),
        id: Joi.string().required(),
        count: Joi.number().required(),
        email: Joi.string().required(),

    })

    Joi.validate(
        console.log("request===="),
        req.body,
        deletehashschema,
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


module.exports.getHashTag = (req, res, next) => {
    const gethashschema = Joi.object().keys({
        name: Joi.string().required(),
        id: Joi.string().required(),
        count: Joi.number().required(),
        email: Joi.string().required(),

    })

    Joi.validate(
        console.log("request===="),
        req.params,
        gethashschema,
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

module.exports.updateHashTag = (req, res, next) => {
    const updatehashschema = Joi.object().keys({
        name: Joi.string().required(),
        id: Joi.string().required(),
        count: Joi.number().required(),
        email: Joi.string().required()
    })

    Joi.validate(
        console.log("request===="),
        req.body,
        updatehashschema,
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

