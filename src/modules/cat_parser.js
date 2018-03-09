'use strict';

import nameToImdb from 'name-to-imdb';
import imdb from 'imdb';

export default function catParser(forRes, forRej, type, item) {
    let arr = item.split(' - '),
        title = 'N/A',
        year = 'N/A',
        prod = 'N/A';

    if (arr[0].length === 4 && arr[0].match(/[\d]{4}/)) {
        year = arr[0]
    }

    /**
     * Determine how many parts each documentary name contains.
     * There're two formats: YEAR - PROD - TITLE or YEAR - TITLE.
     */
    if (type.toLowerCase() === 'documentaries' && arr.length === 3) {
        title = arr[2];
        prod = arr[1];
    } else {
        title = arr[1]
    }

    switch (type.toLowerCase()) {
        case 'animations':
            forRes({
                'type': 'Animation', 'year': year,
                'origTitle': title, 'engTitle': 'N/A',
                'status': 'true'
            });
            break;
        case 'documentaries':
            forRes({
                'type': 'Documentary', 'year': year,
                'prod': prod, 'title': title,
                'status': 'true'
            });
            break;
        case 'movies':
            console.log('→ ' + year, title);
            nameToImdb({ name: title, year: year, type: 'movie' }, (err, res, inf) => {
                if (res) { // nameToImdb could return null when there's no match found
                    imdb(res, (err, data) => {
                        if (data) {
                            forRes({
                                'type': 'Movie', 'year': year,
                                'origTitle': data.title, 'engTitle': title,
                                'director': data.director,
                                'contentRating': data.contentRating,
                                'runtime': data.runtime,
                                'plot': data.description,
                                'imdb_id': res, 'rating': data.rating,
                                'poster': data.poster,
                                'status': 'true'
                            });
                        } else {
                            forRej('No match from imdb.')
                        }
                    })
                } else {
                    forRej('No match from nameToImdb.')
                }
            })
            break;
        case 'tv':
            forRes({
                'type': 'TV', 'year': year,
                'origTitle': title, 'engTitle': 'N/A',
                'status': 'true'
            });
            break;
        default:
            return {};
    }
}