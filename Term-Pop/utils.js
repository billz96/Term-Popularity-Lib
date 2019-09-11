const moment = require('moment'); // date processing lib

// calculate the term's popularity given the total number of likes, shares and tweets
function findPopularity(totalFavorites, totalRetweets, totalTweets) {
    return totalFavorites * 0.33 + totalRetweets * 0.33 + totalTweets * 0.33;
}

// sum of all array elements
function sumOfArray(array) {
    const sum = array.reduce((acc, el) => (acc + el), 0);
    return sum;
}

// returns current date - 14 days (format: YYYY-MM-DD)
function getOldDate() {
    let date = moment().subtract(14, 'days').format("YYYY-MM-DD");
    return date;
}

// returns current date (format: YYYY-MM-DD)
function getNewDate() {
    let date = moment().format("YYYY-MM-DD");
    return date;
}

module.exports = {
    findPopularity,
    sumOfArray,
    getOldDate,
    getNewDate
}