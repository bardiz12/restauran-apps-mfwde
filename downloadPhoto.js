const http = require('https');
const fs = require('fs');

const download = function (url, dest, cb) {
    const file = fs.createWriteStream(dest);
    http.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb);
        });
    });
};

const rawdata = fs.readFileSync('./src/data/menus.json');
const menus = JSON.parse(rawdata);

const downloadPath = './src/public/images/menus';
const publicPath = './images/menus';

Object.keys(menus).forEach((key) => {
    const url = menus[key];
    if (!url.startsWith(publicPath)) {
        const [extension] = url.split('.').slice(-1);
        const fileName = `${key.replace(' ', '-')}.${extension}`;
        menus[key] = `${publicPath}/${fileName}`;
        download(url, `${downloadPath}/${fileName}`, () => {
        });
    }
});

fs.writeFileSync('./src/data/menus.json', JSON.stringify(menus));
