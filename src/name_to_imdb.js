import nameToImdb from 'name-to-imdb';
import imdb from 'imdb';

nameToImdb({
    name: 'The Grand Tour',
    year: 2016,
    type: 'movie'
}, function (err, res, inf) {
    console.log('Error: ', err);
    console.log('Res: ', res); // IMDB id, e.g. tt0121955
    console.log('Inf: ', inf); // Info on where it was matched, e.g. IMDB or Google

    if (res) { // nameToImdb returns null when there's no match
        imdb(res, (err, data) => {
            if (data) {
                console.log(data);
                process.exit(-1);
            } else {
                console.log('No match from imdb.');
                process.exit(-1);
            }
        })
    } else {
        console.log('No match from nameToImdb.');
        process.exit(-1);
    }

})