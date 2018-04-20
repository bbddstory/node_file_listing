'use strict'

import fs from 'fs';
import { data } from './phantomzone-leon-export';

(() => {
    for (let category in data) {
        console.log(category);
        let n = 0;
        for (let item in data[category]) {
            data[category][item].index = n++;
            data[category][item].cat = category;
        }
    }

    fs.writeFileSync('output/sequenced.json', JSON.stringify(data));
})();