"use strict";

import fs from 'fs';
import dirListing from './modules/dir_listing';

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

dirListing(process.argv[2]);

console.log('\n-- Completed.');