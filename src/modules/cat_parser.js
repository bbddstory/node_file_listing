'use strict';

// import firebase from 'firebase';
import nameToImdb from 'name-to-imdb';
import imdb from 'imdb';

export default function catParser(forRes, forRej, type, item, spinner, firebase) {
    let arr = item.split(' - '),
        year = 'N/A',
        prod = 'N/A',
        engTitle = 'N/A', origTitle = 'N/A';

    if (arr[0].length === 4 && arr[0].match(/[\d]{4}/)) {
        year = arr[0]
    }

    /**
     * Detect the number of parts in each documentary name.
     * There're two formats: YEAR - PRODUCTION - TITLE or YEAR - TITLE.
     */
    if (type.toLowerCase() === 'documentaries' && arr.length === 3) {
        prod = arr[1];
        engTitle = arr[2];
    } else {
        engTitle = arr[1]
    }

    /**
     * Detect whether the title (such as animation, movie and TV) contains an
     * original title, which is stored in parenthesis following the English title.
     */
    if(engTitle.includes('(') && engTitle.endsWith(')')) {
        origTitle = engTitle.substring(engTitle.indexOf('(') + 1, engTitle.indexOf(')'));
        engTitle = engTitle.substring(0, engTitle.indexOf('(') - 1);
    }

    /**
     * For original titles in 日本語, there's a second part (also within the parenthesis)
     * for recording the pronounciation of 漢字 using 平仮名 following the original title
     * separated by a comma. E.g. 2017 - Wilderness (あゝ、荒野, ああ、こうや). For storing
     * in Firebase, these two parts need to be formated like this: あゝ、荒野 (ああ、こうや).
     */
    if(origTitle.includes(', ')) {
        let titleArr = origTitle.split(', ');
        origTitle = titleArr[0] + ' (' + titleArr[1] + ')';
    }

    /**
     * Before constructing the object and getting match from nameToImdb and imdb, compare
     * with Firebase first to check whether the record already exists or not.
     */
    firebase.database().ref(type).orderByChild('engTitle').equalTo(engTitle).once('value').then(snapshot => {
        if (snapshot.val()) { // Record exists
            spinner.warn('Record exists: ');
            console.log('→', year, engTitle, origTitle);
            forRej('Record already exists.');
        } else { // Record doesn't exist
            switch (type.toLowerCase()) {
                case 'animations':
                    forRes({
                        'type': 'Animation', 'year': year,
                        'engTitle': engTitle, 'origTitle': origTitle,
                        "status" : 1
                    });
                    break;
                case 'documentaries':
                    forRes({
                        'type': 'Documentary', 'year': year,
                        'prod': prod, 'engTitle': engTitle,
                        "status" : 1
                    });
                    break;
                case 'movies':
                    nameToImdb({ name: engTitle, year: year, type: 'movie' }, (err, res, inf) => {
                        if (res) { // nameToImdb returns null when there's no match
                            imdb(res, (err, data) => {
                                if (data) {
                                    // Give a warning when the title from imdb() is differentfrom the engTile
                                    if (data.title !== engTitle) {
                                        spinner.warn('Title difference: ');
                                        console.log('→', year, engTitle, data.title);
                                    }
                                    forRes({
                                        'type': 'Movie', 'year': year,
                                        'engTitle': engTitle,
                                        'origTitle': origTitle === 'N/A' ? data.title : origTitle,
                                        'director': data.director,
                                        'contentRating': data.contentRating,
                                        'runtime': data.runtime,
                                        'plot': data.description,
                                        'imdb_id': res, 'rating': data.rating,
                                        'poster': data.poster,
                                        "status" : 1
                                    });
                                } else {
                                    console.log('→', year, engTitle);
                                    forRej('No match from imdb.')
                                }
                            })
                        } else {
                            console.log('→', year, engTitle, origTitle);
                            forRej('No match from nameToImdb.')
                        }
                    })
                    break;
                case 'tv':
                    forRes({
                        'type': 'TV', 'year': year,
                        'engTitle': engTitle, 'origTitle': origTitle,
                        "status" : 1
                    });
                    break;
                default:
                    return {};
            }
        }
    }, rejected => {
        console.log(rejected)
    });
}