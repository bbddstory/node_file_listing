"use strict";

import fs from 'fs';

export default function dirRenaming(dir, folderName) {
  /**
   * If folder name contains ' - ', it usually means that the folder
   * has already been named properly. For safety, it's better not to
   * change it, so do nothing and return the folder name.
   */
  if (folderName.includes(' - ')) {
    return folderName
  }

  let oldFolderName = folderName,
      tempArr = [], finalArr = [],
      hit = false, isPrep = false, hasYear = false,
      stopsAt = ['WEBRip', 'Xvid', 'DivX', '720p', '1080p', '1080i', 'PDTV', 'HDTV', 'BluRay', 'BDRip',
                'iNTERNAL', 'D5', 'D9', 'YTS', 'DVDrip', 'Chi_Jap', '中文字幕', '双语字幕', 'HR-HDTV'],
      prepArr = ['and', 'as', 'at', 'by', 'for', 'from', 'in', 'onto', 'of', 'on', 'to', 'the', 'with', 'via', 'vs'];

  folderName = folderName.replace(/(\(|\)|\[|\])/g, ''); // Replace anyone of (,),[,] with en empty string
  folderName = folderName.replace(/ +/g, '.'); // Replace one or more spaces with a dot

  let folderNameArr = folderName.split('.');

  // Extract title and year
  for (let i in folderNameArr) {
    if (!hit) {
      for (let j in stopsAt) {
        if (folderNameArr[i].toLowerCase() === stopsAt[j].toLowerCase()) {
          hit = true
        }
      }
      if (!hit) {
        tempArr.push(folderNameArr[i])
      }
    }
  }

  // Format the extracted title
  for (let m in tempArr) {
    // Check whether the word is prepositional
    for (let n in prepArr) {
      if (tempArr[m].toLowerCase() === prepArr[n]) {
        isPrep = true
      }
    }
    
    if (isPrep) {
      // If it is, decapitalise.
      tempArr[m] = tempArr[m][0].toLowerCase() + tempArr[m].substr(1)
    } else {
      // If it's not, capitalise.
      tempArr[m] = tempArr[m][0].toUpperCase() + tempArr[m].substr(1)
    }
    
    // Change serial index e.g. '1of3' to the format of '(1 of 3)'
    if (tempArr[m].match(/[\d]+of[\d]+/g)) {
      tempArr[m] = '(' + tempArr[m].replace('of', ' of ') + ')'
    }

    isPrep = false;
  }

  // Extract YEAR and push it to the final string array
  for (let k in tempArr) {
    if (tempArr[k].match(/[\d]{4}/g)) {
      finalArr.push(tempArr[k]);
      finalArr.push('-'); // Add SEPARATOR '-'
      tempArr.splice(k, 1); // Remove the year item from temp array
      hasYear = true;
      break;
    }
  }

  // Form the final array by concatenating final and temp array
  finalArr = finalArr.concat(tempArr);

  /**
   * If there's no year in folder name, use production company name 
   * as the leading part.
   * 
   * The assumption is that there're two kinds of folder name, movie
   * and documentary. Movie names almost always have year in them
   * (occasionally they do not), and documentary most sometimes do,
   * but always have a production company name.
   */
  if (!hasYear && finalArr.length > 1) {
    // At position 1, remove 0 item, and add separate '-'.
    finalArr.splice(1, 0, '-');
  }

  /**
   * finalArr should be in one of these formats:
   * YEAR,-,TITLE
   * PRODUCTION,-,TITLE
   */
  let newFolderName = finalArr.join(' ').replace(/ - the/g, ' - The');

  // console.log(dir + '/' + oldFolderName, dir + '/' + newFolderName);
  fs.renameSync(dir + '/' + oldFolderName, dir + '/' + newFolderName);

  /**
   * Return the new folder name to update the listing in dirTraversing.
   * Otherwise the folder path will no longer be available, which will
   * cause no such file error.
   */
  // return oldFolderName;
  return newFolderName;
}