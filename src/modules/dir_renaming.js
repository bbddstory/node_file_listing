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
      temp = [], final = [],
      hit = false, isPrep = false, hasYear = false,
      stopsAt = ['WEBRip', 'Xvid', 'DivX', '720p', '1080p', '1080i', 'PDTV', 'HDTV', 'BluRay', 'BDRip',
                'iNTERNAL', 'D5', 'D9', 'YTS', 'DVDrip', 'Chi_Jap', '中文字幕', '双语字幕', 'HR-HDTV'],
      preps = ['and', 'as', 'at', 'by', 'for', 'from', 'in', 'onto', 'of', 'on', 'to', 'the', 'with', 'via', 'vs'],
      prods = ['BBC', 'NHK', 'TBS'];

  folderName = folderName.replace(/(\(|\)|\[|\])/g, ''); // Replace anyone of (,),[,] with en empty string
  folderName = folderName.replace(/ +/g, '.'); // Replace one or more spaces with a dot

  let folderNameArr = folderName.split('.');

  // Extract title and year into an array
  for (let i in folderNameArr) {
    if (!hit) {
      for (let j in stopsAt) {
        if (folderNameArr[i].toLowerCase() === stopsAt[j].toLowerCase()) {
          hit = true
        }
      }
      if (!hit) {
        temp.push(folderNameArr[i])
      }
    }
  }

  // Format the extracted title
  for (let m in temp) {
    // Check whether the word is prepositional
    for (let n in preps) {
      if (temp[m].toLowerCase() === preps[n]) {
        isPrep = true
      }
    }
    
    if (isPrep) {
      // If it is, decapitalise.
      temp[m] = temp[m][0].toLowerCase() + temp[m].substr(1)
    } else {
      // If it's not, capitalise.
      temp[m] = temp[m][0].toUpperCase() + temp[m].substr(1)
    }
    
    // Change serial index e.g. '1of3' to the format of '(1 of 3)'
    if (temp[m].match(/[\d]+of[\d]+/g)) {
      temp[m] = '(' + temp[m].replace('of', ' of ') + ')'
    }

    isPrep = false;
  }

  // Extract YEAR and push it to the final string array
  for (let k in temp) {
    if (temp[k].match(/[\d]{4}/g)) {
      final.push(temp[k]);
      final.push('-'); // Add hyphen
      temp.splice(k, 1); // Remove the year item from temp array
      hasYear = true;
      break;
    }
  }

  // Form the final array by concatenating final and temp array
  final = final.concat(temp);

  /**
   * If there's no year, use production as the leading part.
   * 
   * The assumption is that there're two kinds of folder name, movie
   * and documentary. Movies almost always have year in them
   * (occasionally they do not), and documentaries sometimes do,
   * but always have a production name.
   */
  if (!hasYear && final.length > 1) {
    // At position 1, remove 0 item, and add hyphen.
    final.splice(1, 0, '-');
    // Capitalise the following word
    final[2] = final[2][0].toUpperCase() + final[2].substr(1);
  }

  /**
   * This is for when documentary names contain both year and production.
   * In which case, insert a hyphen after production and capitalise the
   * following word.
   */
  for (let m in final) {
    for (let n in prods) {
      if (final[m].toLowerCase() === prods[n].toLowerCase()) {
        // Capitalise production in case it's not
        final[m] = final[m].toUpperCase();
        // At position m + 1, remove 0 item, and add hyphen.
        final.splice(Number(m) + 1, 0, '-');
        // Capitalise the word following the newly added hyphen
        final[Number(m) + 2] = final[Number(m) + 2][0].toUpperCase() + final[Number(m) + 2].substr(1);
      }
    }
  }

  /**
   * final array should be in one of these formats:
   * YEAR,-,TITLE
   * PRODUCTION,-,TITLE
   * YEAR,-,PRODUCTION,-,TITLE
   */
  let newFolderName = final.join(' ');

  // console.log(dir + '/' + oldFolderName, '\n', dir + '/' + newFolderName);
  fs.renameSync(dir + '/' + oldFolderName, dir + '/' + newFolderName);

  /**
   * Return the new folder name to update the listing in dirTraversing.
   * Otherwise the folder path will no longer be available, which will
   * cause no such file error.
   */
  // return oldFolderName;
  return newFolderName;
}