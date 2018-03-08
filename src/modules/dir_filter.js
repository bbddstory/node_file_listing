"use strict";

export default function dirFilter(file) {
    file = file.toLowerCase() || '';

    const startsWith = ['SYNO', '@', '#', '_'],
        equalsTo = ['_TEMP', 'Misc', 'Subs'],
        endsWith = ['.txt', '.ini', '.cfg', '.db', 'SynoEAStream'];

    for (let i in startsWith) {
        if (file.startsWith(startsWith[i].toLowerCase())) {
            return false
        }
    }

    for (let j in equalsTo) {
        if (file === equalsTo[j].toLowerCase()) {
            return false
        }
    }

    for (let k in endsWith) {
        if (file.endsWith(endsWith[k].toLowerCase())) {
            return false
        }
    }

    return true;
}