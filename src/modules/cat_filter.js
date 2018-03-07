"use strict";

export default function dirFilter(file) {
    file = file.toLowerCase() || '';

    const rootFolders = ['Animations', 'Documentaries', 'Movies', 'TV'];

    for (let i in rootFolders) {
        if (file.includes(rootFolders[i].toLowerCase())) {
            return true
        }
    }

    return false;
}