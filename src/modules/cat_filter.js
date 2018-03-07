"use strict";

export default function dirFilter(file) {
    file = file.toLowerCase() || '';

    const rootFolders = ['Anime', 'Documentaries', 'Misc', 'Movies', 'NHK', 'The Grand Tour', 'TV Series'];

    for (let i in rootFolders) {
        if (file.includes(rootFolders[i].toLowerCase())) {
            return true
        }
    }

    return false;
}