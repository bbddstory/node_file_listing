"use strict";

export default function catParser(type, item) {
    let arr = item.split(' - '),
        title = 'n/a', year = 'n/a', production = 'n/a';

    if (arr[0].length === 4 && arr[0].match(/[\d]{4}/)) {
        year = arr[0]
    }

    if (type.toLowerCase() === 'documentaries' && arr.length === 3) {
        title = arr[2];
        production = arr[1];
    } else {
        title = arr[1]
    }

    switch (type.toLowerCase()) {
        case 'animations':
            return {
                'type': 'Animation',
                'title': title,
                'year': year,
                'production': 'n/a',
                'status': 'true'
            };
        case 'documentaries':
            return {
                'type': 'Documentary',
                'title': title,
                'year': year,
                'production': production,
                'status': 'true'
            };
        case 'movies':
            return {
                'type': 'Movie',
                'imdb_id': '',
                'title': title,
                'year': year,
                'runtime': 'n/a',
                'genre': 'n/a',
                'production': 'n/a',
                'director': 'n/a',
                'writers': 'n/a',
                'actors': 'n/a',
                'plot': 'n/a',
                'poster': 'n/a',
                'rating': 'n/a',
                'status': 'true'
            };
        case 'nhk':
            return {
                'type': 'NHK',
                'title': title,
                'year': year,
                'production': 'n/a',
                'status': 'true'
            };
        case 'tv':
            return {
                'type': 'TV',
                'title': title,
                'year': year,
                'production': 'n/a',
                'status': 'true'
            };
        default:
            return {};
    }
}