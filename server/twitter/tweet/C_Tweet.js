var _ = require('lodash');

module.exports = function(options) {
    var io = options.io,
    router = options.router,
    Twit = options.twit,
    io_socket = null;
    io.on('connection', function(socket) { // websocket connection
        io_socket = socket;
    });
    router.get('/getTopicTweet', function(req, res) {
        // First get 25 tweets show that user can see something on UI. then start stream.
        if (req.query && req.query.q) {
            Twit.get('search/tweets', _.assignIn({
                count: 25
            }, req.query), function(err, data, response) {
                try {
                    res.json({
                        RESULT_CODE: '1',
                        DATA: data && data.statuses || []
                    });
                    if (io_socket) {
                        if (stream) {
                            stream = undefined;
                        }
                        var stream = Twit.stream('statuses/filter', { track: req.query.q })
                        stream.on('tweet', function(tweet) {
                            console.log(tweet);
                            io_socket.emit('tweet', tweet);
                        });
                    }
                } catch (e) {
                    console.log(e)
                }
            })
        } else {
            res.status(400).send({ RESULT_CODE: '-1', message: 'required param is missing.' });
        }
    });
}