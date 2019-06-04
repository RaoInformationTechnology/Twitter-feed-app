var express = require('express'),
    _ = require('lodash'),
    TwitRouter = express.Router(), // Twitter Module Router
    Twit = new require('twit')(require('../config.js'));

module.exports = function(options) {
    var opt = _.assignIn(options, { router: TwitRouter, twit: Twit });
    require('./tweet/C_Tweet')(opt);
    require('./topic/C_Topic')(opt);
    return TwitRouter
}