"use strict";

import fs from 'fs';
import fsx from 'fs-extra';

export default function dirCreation(dir, file) {
    let nameArr = file.split('.'),
        suffix = nameArr[nameArr.length - 1],
        folderName = file.replace('.' + suffix, '');
    
    fsx.moveSync(dir + '/' + file, dir + '/' + folderName + '/' + file);

    return folderName;
}