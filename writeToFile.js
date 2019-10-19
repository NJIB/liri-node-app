async function writeToFile(file, k) {

    const fs = require('fs');

    if (k >= file.length) {
        console.log("Number of lines to print: " + Object.values(file).length);
        console.log(k + ' record(s) added to log.txt!');
        return;
    } else {
            await fs.appendFile('./log.txt', (
                file[k].line1 +
                file[k].line2 +
                file[k].line3 +
                file[k].line4 +
                file[k].line5 +
                file[k].line6 +
                file[k].line7 +
                file[k].line8 +
                file[k].line9 +
                file[k].line10 
            ),
                (err) => {
                    if (err) throw err;
                });
        k++;
        writeToFile(file, k);
    }
}

module.exports = { logOutput: (file, k) => writeToFile(file, k) };

