let Twitter = require('twit'); // library for fetching data easier from Twitter API

let searchTweets = function (config, query, callback) {

    let twitter = new Twitter(config);

    console.log('about to fetch from search/tweets with query: ' + query);

    let tweets = []; // append all fetched tweets in tweets array

    let delay = 200; // wait 200 milliseconds for each request

    // async recursive function that fetches tweets given a search term
    let fetchPage = function (maxId, callback, count = 30) {

        let params = { q: query, count: count.toString(), include_entities: 1 };

        if (maxId) params.max_id = maxId;

        twitter.get('search/tweets', params, function (err, data, response) {

            if (err) {
                console.log('error fetching search/tweets with params', params);
                console.log(err);
                process.exit(1);
            }

            tweets = tweets.concat(data.statuses);
            console.log('fetched ' + data.statuses.length + ' tweets, total tweets: ' + tweets.length);

            // check if there are no more data
            if (data.statuses.length === 0 || !data.search_metadata.next_results) {
                callback(tweets);
                return;
            }

            let next = data.search_metadata.next_results;
            let re = next.match(/max_id=(\d+)/);

            if (!re) {
                callback(tweets);
                return;
            }

            maxId = re[1];

            // recursive call every 200ms
            setTimeout(function () {
                fetchPage(maxId, callback, 100);
            }, delay);

        });

    }

    // initial call
    fetchPage(undefined, callback, 100);

}

module.exports = searchTweets;