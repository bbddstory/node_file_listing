"use strict";

import fs from 'fs';
import dirFilter from './dir_filter';
import dirCreation from './dir_creation';
import dirRenaming from './dir_renaming';

export default function dirListing(dir) {
    const rootFolders = ['Anime', 'Documentaries', 'Misc', 'Movies', 'NHK', 'The Grand Tour', 'TV Series'];
    let files = fs.readdirSync(dir).sort(),
        isLeaf = true;

    // Check whether the current directory is a leaf (has no subdirectory).
    for (let j in files) {
        if (fs.statSync(dir + '/' + files[j]).isDirectory()) {
            isLeaf = false;
            break;
        }
    }

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
    if (isLeaf) {
        return true
    }

    /**
     * Process items in the current directory
     */
    for (let i in files) {
        if (fs.statSync(dir + '/' + files[i]).isDirectory() && dirFilter(files[i])) {
            /**
             * The current item is a FOLDER, and is cleared by dirFilter.
             * Then keep traversing recursively until reaching a leaf.
             */
            if (dirListing(dir + '/' + files[i])) { // RECURSIVE CALL
                /** (corresponding to 'return true' from above)
                 * Path "dir + '/' + files[i]" has no subdirectory, which means the current
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