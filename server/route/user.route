const express = require('express');
const userRoutes = express.Router();
const userController = require('../controller/user.controller');
const hashtagvalidation = require('../validation/hashtagvalidation.js');

/** Routes Use  */
userRoutes.route('/addtag').post([hashtagvalidation.addhashtag], userController.AddTag);
userRoutes.route('/deletehashtag').delete([hashtagvalidation.deletehashtag], userController.DeleteHashtag);
userRoutes.route('/updatehashtag').put([hashtagvalidation.updateHashTag],userController.UpdateHashtag);
userRoutes.route('/gethashtag/:email').get([hashtagvalidation.getHashTag], userController.GetHashTag);

module.exports = userRoutes;
