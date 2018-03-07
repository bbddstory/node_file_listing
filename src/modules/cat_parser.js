"use strict";

export default function catParser(type, title) {
    let arr = title.split(' - ')
    year = 'n/a';

    if (arr[0].length === 4 && arr[0].match(/[\d]{4}/)) {
        year = arr[0];
    }

    switch (type.toLowerCase()) {
        case 'animations':
            return {
                "type": "Animation",
                "title": arr[1],
                "year": year,
                "production": "n/a",
                "status": "true"
            }
        case 'documentaries':
            return {
                "type": "Documentary",
                "title": arr[1],
                "year": year,
                "production": "n/a",
                "status": "true"
            }
        case 'misc':
            return {
                "type": "Misc",
                "title": arr[1],
                "year": year,
                "production": "n/a",
                "status": "true"
            };
        case 'movies':
            return {
                "type": "Movie",
                "imdb_id": "",
                "title": arr[1],
                "year": year,
                "runtime": "n/a",
                "genre": "n/a",
                "production": "n/a",
                "director": "n/a",
                "writers": "n/a",
                "actors": "n/a",
                "plot": "n/a",
                "poster": "n/a",
                "rating": "n/a",
                "status": "true"
            };
        case 'nhk':
            return {
                "type": "NHK",
                "title": arr[1],
                "year": year,
                "production": "n/a",
                "status": "true"
            };
        case 'tv':
            return {
                "type": "TV",
                "title": arr[1],
                "year": year,
                "production": "n/a",
                "status": "true"
            };
        default:
            return {
                "type": type,
                "title": title,
                "year": "n/a",
                "production": "n/a",
                "status": "false"
            };
    }
}