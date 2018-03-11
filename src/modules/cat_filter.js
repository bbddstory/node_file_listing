"use strict";

export default function dirFilter(file) {
    file = file || '';

    const rootFolders = ['Animations', 'Documentaries', 'Movies', 'TV'];

    for (let i in rootFolders) {
        if (file === rootFolders[i]) {
            return true
        }
    }

    return false;
}