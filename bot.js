var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet = function() {
	var params = {
		q: '#utahjazz, #takenote, #gobert',
		result_type: 'recent',
		lang: 'en'
	};

    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
            var retweetId = data.statuses[0].id_str;
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Sucessful Retweet!');
                }
                if (err) {
                    console.log('Retweeting Error');
                }
            });
        }
        else {
          console.log('Searching Error');
        }
    });
};

retweet();
setInterval(retweet, 3000000);



