"use strict";

export default function dirFilter(filelist) {
    let templist = [],
        valid = true,
        startsWith = ['SYNO'],
        endsWith = ['.txt', '.ini', '.cfg', '.js', '.db', 'SynoEAStream'];

    for (let i in filelist) {
        for (let j in startsWith) {
            if (filelist[i].startsWith(startsWith[j])) {
                valid = false;
            }
        };

        for (let k in endsWith) {
            if (filelist[i].endsWith(endsWith[k])) {
                valid = false;
            }
        };

        if (valid) {
            templist.push(filelist[i]);
        };

        valid = true;
    };

    return templist;
}