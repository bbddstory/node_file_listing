'use strict';

import 'babel-polyfill';
import fs from 'fs';
import ora from 'ora';
// import firebase from 'firebase';
import catFilter from './cat_filter';
import catParser from './cat_parser';

export default async function catListing(uploadRes, uploadRej, dir, firebase) {
    const spinner = ora('Loading...');
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
                    catParser(res, rej, files[i], items[j], spinner, firebase);
                    spinner.start();
                }).then(value => {
                    // spinner.succeed('Successful');
                    catObj[files[i]][items[j]] = value;
                }, reason => {
                    spinner.stop('Rejected');
                    console.log('∞ Rejected: ', reason);
                }).catch(err => {
                    spinner.fail('Failed');
                    console.log('∞ Catched: ', err);
                })
            }
        }
    }

    uploadRes(catObj);
}