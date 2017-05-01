var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet = function() {
	var params = {
		q: '#takenote',
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
setInterval(retweet, 1800000);

var favoriteTweet = function() {
	var params = {
		q: '#takenote',
		result_type: 'recent',
		lang: 'en'
	};

	Twitter.get('search/tweets', params, function(err, data) {
		var tweet = data.statuses;
		var randomTweet = random(tweet);

		if (typeof randomTweet !== 'undefined') {
			Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response) {
				if (err) {
					console.log("Cannot favorite");
				}
				else {
					console.log("Tweet favorited!");
				}
			});
		}
	});
};

function random(arr) {
	var index = Math.floor(Math.random()*arr.length);
	return arr[index];
}

favoriteTweet();
setInterval(favoriteTweet, 3600000);


