var _ = require('lodash');
module.exports = function(options) {
    var io = options.io,
        router = options.router,
        Twit = options.twit;
    router.get('/getTrendingTopics', function(req, res) {
        // returns trending topics.
        Twit.get('trends/place', _.assignIn({
            id: 1940345,
            count: 25
        }, req.query), function(err, data, response) {
            try {
                res.json({
                    RESULT_CODE: '1',
                    DATA: data && _.head(data) ? _.head(data).trends.slice(0, 25) : []
                });
            } catch (e) {
                console.log(e)
            }

        });
    });
}
