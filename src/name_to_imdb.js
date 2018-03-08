import nameToImdb from 'name-to-imdb';

nameToImdb({
    name: "Je t'aime, je t'aime", year: 1968, type: 'movie'
}, function (err, res, inf) {
    console.log(res); // prints "tt0121955"
    console.log(inf); // inf contains info on where we matched that name - e.g. locally, or on google
})