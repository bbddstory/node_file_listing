"use strict";

import fs from 'fs';
import fsx from 'fs-extra';
import path from 'path';
import hasSubs from './has_subs';
import dirFilter from './dir_filter';
import dirCreation from './dir_creation';
import dirRenaming from './dir_renaming';

export default function dirTraversing(dir) {
    let files = fs.readdirSync(dir).sort(),
        isLeaf = true;

    // Check whether the current directory is a leaf (has no subdirectories).
    for (let j in files) {
        if (fs.statSync(dir + '/' + files[j]).isDirectory()) {
            isLeaf = false;
            // break;
        } else {
            // Delete unwanted files
            const targets = ['.torrent', '.nfo', '.png', '.gif'];
            let ext = path.extname(dir + '/' + files[j]);

            for (let k in targets) {
                if (ext === targets[k]) {
                    fsx.removeSync(dir + '/' + files[j])
                    files.splice(j, 1); // Update the list after removal
                }
            }
        }
    }

    /**
     * If all items in current directory are files, then it's a leaf, in
     * which case do nothing and return true. If current directory contains
     * a folder called 'Subs', it also mean that this is a leaf. Then move
     * all of the subtitle files from Subs to current directory.
     * 
     * This means that, a folder must contain at least one subdirectories
     * in order to trigger the renaming process in that folder.
     */
    if (isLeaf || hasSubs(dir, files)) {
        return true
    }

    /**
     * Process items in current directory
     */
    for (let i in files) {
        if (fs.statSync(dir + '/' + files[i]).isDirectory() && dirFilter(files[i])) {
            /**
             * The current item is a FOLDER, and is cleared by dirFilter.
             * Then keep traversing recursively until reaching a leaf.
             */
            if (dirTraversing(dir + '/' + files[i])) { // RECURSIVE CALL
                /**
                 * (corresponding to 'return true' from above)
                 * 
                 * Path "dir + '/' + files[i]" has no subdirectories, which means the current
                 * directory (files[i]) is a leaf, then process current directory's name.
                 * 
                 * dirRenaming returns the new folder name to update the current files[i],
                 * Otherwise the folder path will no longer be available, which will
                 * cause no such file error.
                 */
                files[i] = dirRenaming(dir, files[i])
            }
        }

        if (fs.statSync(dir + '/' + files[i]).isFile()) {
            /**
             * The current item is a FILE, move it in a folder with the same, only
             * without the extension (suffix). Then process the folder name.
             */
            let folderName = dirCreation(dir, files[i]);
            /**
             * Rename the folder, keep the file with it's original name for reference.
             * 
             * dirRenaming returns the new folder name to update the current files[i],
             * Otherwise the folder path will no longer be available, which will
             * cause no such file error.
             */
            files[i] = dirRenaming(dir, folderName);
        }
    }
}