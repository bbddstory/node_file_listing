"use strict";

import fs from 'fs';
import dirListing from './modules/dir_listing';

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

let catObj = dirListing(process.argv[2]);
console.log('\n-- Listing completed.');

fs.writeFileSync('../output/list.json', JSON.stringify(catObj));
console.log('\n-- Saving completed.');