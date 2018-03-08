'use strict';

import nameToImdb from "name-to-imdb";
import imdb from "imdb";
import "babel-polyfill";

export default function catParser(type, item) {
    let arr = item.split(' - '),
        title = 'n/a',
        year = 'n/a',
        prod = 'n/a';

    if (arr[0].length === 4 && arr[0].match(/[\d]{4}/)) {
        year = arr[0]
    }

    if (type.toLowerCase() === 'documentaries' && arr.length === 3) {
        title = arr[2];
        prod = arr[1];
    } else {
        title = arr[1]
    }

    switch (type.toLowerCase()) {
        case 'animations':
            return {
                'type': 'Animation',
                'year': year,
                'origTitle': title,
                'engTitle': 'n/a',
                'status': 'true'
            };
            break;
        case 'documentaries':
            return {
                'type': 'Documentary',
                'year': year,
                'prod': prod,
                'title': title,
                'status': 'true'
            };
            break;
        case 'movies':
            let meta = {};
            const promise = new Promise((resolve, reject) => {
                nameToImdb({
                    name: title
                }, async (err, res, inf) => {
                    imdb(res, (err, data) => {
                        if (data) {
                            meta = {
                                'type': 'Movie',
                                'year': year,
                                'origTitle': data.title,
                                'engTitle': title,
                                'director': data.director,
                                'genre': data.genre,
                                'contentRating': data.contentRating,
                                'runtime': data.runtime,
                                'plot': data.description,
                                'imdb_id': res,
                                'rating': data.rating,
                                'poster': data.poster,
                                'status': 'true'
                            }
                            resolve('success');
                        } else {
                            reject('No data.')
                        }
                    })
                })
            });

            promise.then(() => {
                console.log(meta.origTitle);
                return meta;
            }, (err) => {
                console.log('Rejected: ', err);
            }).catch((err) => {
                console.log('Catched: ', err);
            });
            break;
        case 'tv':
            return {
                'type': 'TV',
                'year': year,
                'origTitle': title,
                'engTitle': 'n/a',
                'status': 'true'
            };
            break;
        default:
            return {};
    }
}