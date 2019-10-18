async function writeToFile(file, k) {

    const fs = require('fs');

    if (k >= file.length) {
        return;
    } else {
        await fs.appendFile('./log.txt', (
            '\n ' +
            file[k].line1 +
            file[k].line2 +
            file[k].line3 +
            file[k].line4 +
            file[k].line5 +
            file[k].line6
        ),
            (err) => {
                if (err) throw err;
                console.log('Records appended to file!');
            });
        k++;
        console.log("k: " + k, file[k].line2);
        writeToFile(file, k);
    }

}

module.exports = {logOutput:(file, k) => writeToFile(file, k)};

