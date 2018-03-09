# node_file_listing
Directory processing utility for PhantomZone using NodeJS. It is for organising and renaming files and folders in the video repository.

# How to use
1. Install packages: npm i
2. The code is written in ES6, and needs to be compiled into ES2015 using babel. Command "npm run build" builds and watches the files.
3. To process a folder: node dir_processing.js FULL_PATH
4. To compile all the files into one: npx babel src -o master-compiled.js

# Babel reference
https://babeljs.io/docs/usage/cli/