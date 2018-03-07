"use strict";

import fs from 'fs';
import catFilter from './cat_filter';
import catParser from './cat_parser';

export default function catListing(dir) {
    let files = fs.readdirSync(dir).sort(),
        items, catObj = {};

    /**
     * Process items in current directory
     */
    for (let i in files) {
        if (catFilter(files[i])) {
            catObj[files[i]] = {};
            items = fs.readdirSync(dir + '/' + files[i]);

            for (let j in items) {
                catObj[files[i]][items[j]] = catParser(files[i], items[j])
            }
        }
    }

    return catObj;
}