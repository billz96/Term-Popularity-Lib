const searchTweets = require('./search-tweets');
const config = require('./config'); // import twitter credentials
const {findPopularity, sumOfArray, getOldDate, getNewDate} = require('./utils'); // import helper functions

function termPopularity(term, callback) {

    const oldDate = getOldDate(); // current date - 14 days (format: YYYY-MM-DD)
    const newDate = getNewDate(); // current date (format: YYYY-MM-DD)

    // prepare the search query
    let query = `#${term} since:${oldDate} until:${newDate}`;

    let _term = term.toLowerCase(); // convert the term's letters to lower case for filtering

    // fetches tweets during since 14 days ago given a search term and a config object
    searchTweets(config, query, tweets => {
        
        // find tweets that contain the #term in the hashtag array
        tweets = tweets.filter(tweet => {
            let hashtags = tweet.entities.hashtags;
            if (hashtags) {
                hashtags = hashtags.filter(hashtag => {
                    return hashtag.text.toLowerCase() == _term;
                });

                return hashtags.length > 0 ? true : false;
            } else {
                return false;
            }
        });

        console.log(`total tweets after filtering: ${tweets.length}`);

        let retweet_count_arr = tweets.map(tweet => (tweet.retweet_count)); // get tweet's retweets
        let favorite_count_arr = tweets.map(tweet => (tweet.favorite_count)); // get tweet's favourites

        let totalRetweets = sumOfArray(retweet_count_arr);
        let totalFavorites = sumOfArray(favorite_count_arr);
        let totalTweets = tweets.length;

        let mark = findPopularity(totalFavorites, totalRetweets, totalTweets);

        // fiting/scaling `X` into a range [a,b]:
        // Xnormalized = (b - a) * (X - minX / maxX - minX) + a
        // term popularity's initial range: [0, Number.MAX_VALUE]
        // fit/scale `term popularity` into [0-10]:
        popularity = parseFloat(`${10 * (mark / Number.MAX_VALUE)}`.substring(0, 4));

        let results = {
            popularity, // popularity after fiting it into [0, Number.MAX_VALUE]
            mark, // popularity before fiting it into [0, 10]
            totalRetweets,
            totalFavorites,
            totalTweets
        };

        callback(results);
    });
}

module.exports = termPopularity;