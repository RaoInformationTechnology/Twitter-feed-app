const Joi = require('joi');

module.exports.tweets = (req, res, next) => {
    const tweetschema = Joi.object().keys({
        name: Joi.string().required(),
        id: Joi.string().required(),
        count: Joi.number().required()

    })

    Joi.validate(
        console.log("request===="),
        req.query,
        tweetschema,
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

