const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

/** 
 * @param {*} userData
 * Add Hashtag Service
 */
module.exports.AddTag = (userData) => {
    return new Promise((resolve, reject) => {
        userModel.findOneAndUpdate({ email: userData.email }, { $addToSet: { hashtag: userData.hash } }, { new: true }, (err, updres) => {
            if (err) {
                console.log("err", err);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                console.log('updres: ', updres);
                resolve({ status: 200, message: 'user data fetched', data: updres });
            }
        });
    })
}

/** 
 * @param {*} userDeletetag
 * Delete Hashtag Service
 */
module.exports.DeleteHashtag = (userDeletetag) => {
    return new Promise((resolve, reject) => {
        userModel.update({ email: userDeletetag.email }, { $pull: { "hashtag": { hashtag: userDeletetag.hashtag } } }, function (err, deletehashtag) {
            if (err) {
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                console.log(err, deletehashtag);
                resolve({ status: 200, message: 'user data fetched', data: deletehashtag });
            }
        })
    })
}

/** 
 * @param {*} updateHashtag
 * Update Hashtag Service
 */
module.exports.UpdateHashtag = (updateHashtag) => {
    return new Promise((resolve, reject) => {
        userModel.findOneAndUpdate({ email: updateHashtag.email }, { $set: { "hashtag.0.hashtag": updateHashtag.hashtag } }, { upsert: true, new: true }, function (err, updatehashtag) {
            if (err) {
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                console.log(err, updatehashtag);
                resolve({ status: 200, message: 'user data fetched', data: updatehashtag });
            }
        })
    })
}

/** 
 * @param {*} GetHashTag
 * GetHashtag Service
 */
module.exports.GetHashTag = (userGetHashtag) => {
    return new Promise((resolve, reject) => {
        userModel.find({ email: userGetHashtag.email }, function (err, hashtag) {
            if (err) {
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'user data fetched', data: hashtag });
            }
        })
    })
}

module.exports.authenticateUser = (userJWTToken) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userJWTToken.email },
            (userError, userResponse) => {
                if (userError) {
                    console.log('userError', userError);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else if (!userResponse) {
                    reject({ status: 401, message: 'Incorrect email or password' });
                } else {
                    const email = userJWTToken.email;
                    const payload = { email };
                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
                    resolve({ status: 200, message: 'JWT token', data: token });
                }
            }
        )
    })
}