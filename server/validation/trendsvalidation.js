const Joi = require('joi');

/** Twitter-trends validation */
module.exports.trends = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        id: Joi.string().required(),
    })

    Joi.validate(
        console.log("request===="),
        req.query,
        schema,
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

