import nameToImdb from "name-to-imdb";
import imdb from "imdb";

nameToImdb({
    // { name: "The Devil Bat", year: 1940, type: "movie" }
    // name: process.argv[2]
    name: "Witness for the Prosecution"
}, (err, res, inf) => {
    console.log(inf); // inf contains info on where we matched that name - e.g. locally, or on google
    console.log(res); // prints "tt0121955"

    imdb(res, (err, data) => {
        if (err) {
            console.log(err.stack);
        }

        if (data) {
            console.log(data);
            // process.exit(-1);
        }
    });
})