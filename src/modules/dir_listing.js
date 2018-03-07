"use strict";

import fs from 'fs';
import catFilter from './cat_filter';

export default function dirListing(dir) {
    let items,
        catObj = {},
        files = fs.readdirSync(dir).sort();

    /**
     * Process items in current directory
     */
    for (let i in files) {
        if (catFilter(files[i])) {
            catObj[files[i]] = {};
            items = fs.readdirSync(dir + '/' + files[i]);

            switch (files[i]) {
                case 'Documentaries':
                    for (let j in items) {
                        catObj[files[i]][items[j]] = {
                            "type": files[i],
                            "title": items[j],
                            "year": '1990',
                            "production": 'NHK',
                            "status": "true"
                        }
                    }
                    break;
                case 'Movies':
                    for (let j in items) {
                        catObj[files[i]][items[j]] = {
                            "imdb_id": "",
                            "title": items[j],
                            "year": "1995",
                            "runtime": "106 min",
                            "genre": "Crime, Drama, Mystery",
                            "director": "Bryan Singer",
                            "writers": "Christopher McQuarrie",
                            "actors": "Kevin Spacey , Gabriel Byrne , Chazz Palminteri",
                            "plot": "Following a truck hijack in New York, five conmen are arrested and brought together for questioning. As none of them are guilty, they plan a revenge operation against the police. The operation goes well, but then the influence of a legendary mastermind criminal called Keyser Söze is felt. It becomes clear that each one of them has wronged Söze at some point and must pay back now. The payback job leaves 27 men dead in a boat explosion, but the real question arises now: Who actually is Keyser Söze?",
                            "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YWE4NGI2ZjVmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
                            "rating": "8.6",
                            "type": "movie",
                            "status": "true"
                        }
                    }
                    break;
                default:
                    catObj[files[i]][items[j]] = {
                        "type": files[i],
                        "title": items[j],
                        "status": "false"
                    }
                    break;
            }

        }
    }

    return catObj;
}