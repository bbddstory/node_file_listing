"use strict";

import fs from 'fs';

export default function dirRenaming(dir, folderName) {
  console.log('-- ', dir, folderName);
  
  /**
   * Containing ' - ' means that the folder's already properly named,
   * then do nothing and return.
   */
  if(folderName.includes(' - ')) {
    return false;
  };
  
  let nameArr = folderName.split('.'), tempArr = [], finalArr = [], suffix = '',
      hit = false, hasYear = false,
      stoppers = ['WEBRip', 'Xvid', 'DivX', '720p', '1080p', '1080i', 'PDTV', 'HDTV', 'BluRay', 'BDRip'],
      prepArr = ['as', 'at', 'by', 'for', 'from', 'in', 'onto', 'of', 'on', 'to', 'the', 'with', 'via', 'vs'];

  // In case folder name is separated by spaces instead of dots
  if(nameArr.length === 1) {
    nameArr = folderName.split(' ');
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