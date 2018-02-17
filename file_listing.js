"use strict";

const fs = require('fs');

fs.readdir(__dirname, (err, files) => {
  for (let i in files)
    fs.appendFile('filelist.txt', files[i] + '\n', (err) => {
      if (err) throw err;
    });

  console.log('-- Listing completed.');
});
