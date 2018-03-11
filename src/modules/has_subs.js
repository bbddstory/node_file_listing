"use strict";

import fsx from 'fs-extra';

/**
 * If current directory (dir) contains a folder called 'Subs',
 * it means that it's a leaf. Then move all of the subtitle files
 * from Subs to current directory.
 * @param {*} dir 
 * @param {*} files 
 */
export default function hasSubs(dir, files) {
    for (let i in files) {
        if (files[i].toLowerCase() === 'subs') {
            // For reasons unknown, fsx.move() doesn't work.
            fsx.copySync(dir + '/' + files[i], dir);
            fsx.removeSync(dir + '/' + files[i]);

            return true;
        }
    }

    return false;
}