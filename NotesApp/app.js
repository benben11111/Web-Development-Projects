console.log('Starting app!');

const fs = require('fs');
const os = require('os');
const uc = require('upper-case');

fs.appendFile('Notes', uc('Hello World'), (err) => {
    if(err) throw err;
    console.log('Updated!');
});

//fs.appendFileSync('Notes', uc(('Hello World!'));

// fs.unlink('Notes1', err => {
//     if (err) throw err;
//     console.log('Deleted!');
// })