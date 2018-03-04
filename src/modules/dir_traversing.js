"use strict";

import fs from 'fs';

export default function recursiveListing(dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    let templist = [];
    let exclusionFolders = ['Anime', 'Misc', 'TV Series', 'The Grand Tour'];
    let hit = false;

    for (let i in files) {
        if (fs.statSync(dir + files[i]).isDirectory() && 
            !files[i].startsWith('#') && !files[i].startsWith('_')) {
            for (let j in exclusionFolders) {
                if (files[i].toLowerCase() === exclusionFolders[j].toLowerCase()) {
                    hit = true
                }
            }
            if (!hit) {
                templist.push(fs.realpathSync(dir + files[i]))
            }
            hit = false
        }
    }

    console.log(templist);

    // files.forEach((file) => {
    //   if (fs.statSync(dir + '/' + file).isDirectory()){
    //     if(!file.startsWith('#') && !file.startsWith('@')) { // Customisable rules
    //       filelist.push(file);
    //       filelist = recursiveListing(dir + '/' + file, filelist);
    //     };
    //   } else {
    //     filelist.push(file);
    //   };
    // });

    // return filelist;
}