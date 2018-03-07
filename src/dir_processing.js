"use strict";

import fs from 'fs';
import dirTraversing from './modules/dir_traversing';

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

dirTraversing(process.argv[2]);

console.log('\n-- Processing completed.');