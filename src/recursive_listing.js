"use strict";

let fs = require('fs');
// import fs from 'fs';

const recursiveListing = (dir, filelist) => {
  fs = fs || require('fs');
  let files = fs.readdirSync(dir);
  filelist = filelist || [];

  files.forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()){
      if(file !== '#recycle' && !file.startsWith('@')) { // Customisable rules
        filelist.push(file);
        filelist = recursiveListing(dir + '/' + file, filelist);
      };
    } else {
      filelist.push(file);
    };
  });

  return filelist;
};

const listFilter = (filelist) => {
  let templist = [],
      valid = true,
      startsWith = ['SYNO'],
      endsWith = ['.txt', '.ini', '.cfg', '.js', '.db', 'SynoEAStream'];

  for(let i in filelist) {
    for(let j in startsWith) {
      if(filelist[i].startsWith(startsWith[j])) {
        valid = false;
      }
    };

    for(let k in endsWith) {
      if(filelist[i].endsWith(endsWith[k])) {
        valid = false;
      }
    };

    if(valid) {
      templist.push(filelist[i]);
    };

    valid = true;
  };

  return templist;
};

let recursivelist = recursiveListing('./');
let finallist = listFilter(recursivelist);

for(let i in finallist) {
  fs.appendFile('filelist.txt', finallist[i] + '\n', (err) => {
    if (err) throw err;
  });
};

console.log('\n-- Listing completed.');
console.log('-- ' + finallist.length + ' files in total.\n');
