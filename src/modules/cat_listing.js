'use strict';

import fs from 'fs';
import catFilter from './cat_filter';
import catParser from './cat_parser';
import 'babel-polyfill';

export default async function catListing(uploadRes, uploadRej, dir) {
    let files = fs.readdirSync(dir).sort(),
        items = [],
        catObj = {};

    /**
     * Process items in current directory
     */
    for (let i in files) {
        if (catFilter(files[i])) {
            catObj[files[i]] = {};
            items = fs.readdirSync(dir + '/' + files[i]);
            for (let j in items) {
                await new Promise((res, rej) => {
                    catParser(res, rej, files[i], items[j])
                }).then(value => {
                    catObj[files[i]][items[j]] = value
                }, reason => {
                    console.log('Rejected: ', reason);
                }).catch(err => {
                    console.log('Catched: ', err);
                })
            }
        }
    }

    uploadRes(catObj);
}