'use strict'

import fs from 'fs';
import { data } from './phantomzone-leon-export';
import { setInterval } from 'timers';

(() => {
    let insertsArr = [],
        insert = '';

    for (let category in data) {
        if (category === 'Users') {
            continue;
        }
        console.log(category);

        for (let item in data[category]) {
            let properties = '`id`,',
                values = '\'__timeinmilliseconds__\',';

            for (let property in data[category][item]) {
                if (property === 'index') {
                    continue;
                }
                values += '\'' + data[category][item][property] + '\',';
                switch (property) {
                    case 'cat':
                        property = 'category';
                        break;
                    case 'engTitle':
                        property = 'eng_title';
                        break;
                    case 'origTitle':
                        property = 'orig_title';
                        break;
                    case 'imdb_id':
                        property = 'imdb';
                        break;
                    default:
                        break;
                }
                properties += '`' + property + '`,';
            }
            properties = properties.substring(0, properties.length - 1);
            values = values.substring(0, values.length - 1);

            insert = 'INSERT INTO `phantom_zone`.`videos`(' + properties + ') VALUES(' + values + ');\n';
            insertsArr.push(insert);
        }
    }

    let counter = 0;
    let setTime = setInterval(function () {
        if (counter < insertsArr.length) {
            fs.appendFileSync(
                'output/inserts.txt',
                insertsArr[counter].replace('__timeinmilliseconds__', new Date().getTime())
            );
            counter++;
        } else {
            clearInterval(setTime);
        }
    }, 1);
    
    // fs.writeFileSync('output/inserts.txt', timedArr.join(';\n'));
})();