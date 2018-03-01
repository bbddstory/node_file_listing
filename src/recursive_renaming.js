"use strict";

const fs = require('fs');
// import fs from 'fs';

// fs.rename(dir + '/' + file, dir + '/' + 'BBC - Timeshift', (err) => {
//   if (err) throw err;
// });

const itemRenaming = (name, type) => {
  if(!name.includes(' - ')) {
    let nameArr = name.split('.'), tempArr = [], finalArr = [], suffix = '',
        hit = false, hasYear = false,
        stoppers = ['WEBRip', 'Xvid', 'DivX', '720p', '1080p', '1080i', 'PDTV', 'HDTV', 'BluRay', 'BDRip'],
        prepArr = ['as', 'at', 'by', 'for', 'from', 'in', 'onto', 'of', 'on', 'to', 'the', 'with', 'via', 'vs'];

    // In case file/folder name is separated by space instead of dot
    if(nameArr.length === 1) {
      nameArr = name.split(' ');
    };

    // Retain only the title (include year)
    for(let i in nameArr) {
      if(!hit) {
        for(let j in stoppers) {
          if(nameArr[i].toLowerCase() === stoppers[j].toLowerCase()) {
            hit = true;
          }
        };
        if(!hit) {
          tempArr.push(nameArr[i]);
        };
      }
    };

    // If this is a file, get the suffix
    if(type === 'file') {
      suffix = nameArr[nameArr.length - 1];
    };

    for(let m in tempArr) {
      // Capitalise non-preposition words
      let isPrep = false;
      for(let n in prepArr) {
        if(tempArr[m].toLowerCase() === prepArr[n]) {
          isPrep = true;
        }
      };
      if(!isPrep)
        tempArr[m] = tempArr[m][0].toUpperCase() + tempArr[m].substr(1);

      // Change '1of3' to '(1 of 3)'
      if(tempArr[m].match(/[\d]+of[\d]+/g)) {
        tempArr[m] = '(' + tempArr[m].replace('of', ' of ') + ')';
      };
    };

    // 1.Get YEAR
    for(let k in tempArr) {
      if(tempArr[k].length === 4 && tempArr[k].match(/[\d]{4}/g)) {
        finalArr.push(tempArr[k]);
        finalArr.push('-'); // 2.Add SEPARATOR '-'
        tempArr.splice(k, 1); // 3.Remove the year item from temp array
        hasYear = true;
      }
    };

    finalArr = finalArr.concat(tempArr); // 4.Form the final array

    // If the file has no year, use publisher as the leading part
    if(!hasYear) {
      finalArr.splice(1, 0, '-');
    };

    // finalArr should be in this sequence: YEAR,-,TITLE
    return finalArr.join(' ') + '.' + suffix;
  };

  return name;
};

const recursiveListing = (dir, filelist) => {
  fs = fs || require('fs');
  let files = fs.readdirSync(dir);
  filelist = filelist || [];

  files.forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      if(file !== '#recycle' && !file.startsWith('@')) { // Customisable rules
        filelist.push(file);
        filelist = recursiveListing(dir + '/' + file, filelist);
      }
    } else {
      filelist.push(file);
    }
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
let filteredlist = listFilter(recursivelist);
let finallist = [];

for(let i in filteredlist) {
  finallist.push(itemRenaming(filteredlist[i], 'file'));
};

for(let i in finallist) {
  fs.appendFile('filelist.txt', finallist[i] + '\n', (err) => {
    if (err) throw err;
  });
};

console.log('\n-- Listing completed.');
console.log('-- ' + finallist.length + ' files in total.\n');
