'use strict'

import fs from 'fs';
import { data } from './phantomzone-leon-export';

(() => {
    for (let i in data) {
        console.log(i);
        let n = 0;
        for (let j in data[i]) {
            data[i][j].index = n++;
        }
    }

    fs.writeFileSync('../output/sequenced.json', JSON.stringify(data));
})();