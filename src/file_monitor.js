"use strict";

const fs = require('fs');

console.log('The current path is being monitored...');

fs.watch('./', {recursive: true}, (event, filename) => {
    console.log('-- Event: ' + event);

    if (filename) {
        console.log('-- Filename: ' + filename);
    } else {
        console.log('-- Filename not provided.');
    }
});
