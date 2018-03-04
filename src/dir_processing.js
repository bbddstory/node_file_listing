"use strict";

import fs from 'fs';
import recursiveListing from './modules/recursive_listing';
import dirFilter from './modules/dir_filter';

let recursivelist = recursiveListing('Z:\\');
let finallist = dirFilter(recursivelist);

for (let i in finallist) {
  fs.appendFile('../output/file_list.txt', finallist[i] + '\n', (err) => {
    if (err) throw err;
  });
}

console.log('\n-- Listing completed.');
console.log('-- ' + finallist.length + ' files in total.\n');