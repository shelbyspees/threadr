require('dotenv').config()
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

var params = {};
var tweets = [];  // in reverse order

var get_prev = function (tweetID) {
    client.get('statuses/show/' + tweetID, params, function (error, current, response) {
        if (!error) {
            tweets.push(current);
            if (current.in_reply_to_screen_name) {
                get_prev(current.in_reply_to_status_id_str);
            }
            else {
                while (tweets.length > 0) {
                    console.log(`{{< tweet-single ${tweets.pop().id_str} >}}`);
                }
            }
        }
        else {
            console.log(error);
        }
    });
}

get_prev(process.argv[2]);
