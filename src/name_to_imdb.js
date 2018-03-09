import nameToImdb from 'name-to-imdb';

nameToImdb({
    name: 'René Clair Paris Qui Dort', year: 1923, type: 'movie'
}, function (err, res, inf) {
    console.log(err);
    console.log(res); // IMDB id, e.g. tt0121955
    console.log(inf); // Info on where it was matched, e.g. IMDB or Google
    
    process.exit(-1);
})