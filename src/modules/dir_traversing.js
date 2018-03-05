"use strict";

import fs from 'fs';
import dirFilter from './dir_filter';
import dirCreation from './dir_creation';
import dirRenaming from './dir_renaming';

export default function dirTraversing(dir) {
    let files = fs.readdirSync(dir).sort(),
        hasSubdir = false;

    // Check whether the current directory is a leaf (has no subdirectory).
    for (let j in files) {
        if (fs.statSync(dir + '/' + files[j]).isDirectory()) {
            hasSubdir = true;
            break;
        }
    };

    /**
     * If all items in current directory are files, then it's a leaf, in
     * which case do nothing and return true. This is the only way I can
     * think of at the moment. Otherwise there's no way to distinguish 
     * between a folder containing multiple different videos and a folder
     * containing multiple videos of the same serie.
     * 
     * This means that, a folder must contain at least one subdirectory
     * in order to trigger the renaming process in that folder.
     */
    if (!hasSubdir) {
        return true
    };

    /**
     * Process items in the current directory
     */
    for (let i in files) {
        if (fs.statSync(dir + '/' + files[i]).isDirectory() && dirFilter(files[i])) {
            /**
             * The current item is a FOLDER, and is cleared by dirFilter.
             * Then keep traversing recursively until reaching a leaf.
             */
            if (dirTraversing(dir + '/' + files[i])) { // RECURSIVE CALL
                /** (corresponding to 'return true' from above)
                 * Path "dir + '/' + files[i]" has no subdirectory, which means the current
                 * directory (files[i]) is a leaf, then process current directory's name.
                 */
                dirRenaming(dir, files[i])
            }
        } else {
            /**
             * The current item is a FILE, move it in a folder with the same, only
             * without the extension (suffix). Then process the folder name.
             */
            let folderName = dirCreation(dir, files[i]);
            // Rename the folder, always keep the file with it's original name for reference.
            dirRenaming(dir, folderName)
        }
    };
};