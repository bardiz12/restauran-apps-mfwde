const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const generateMenusImage = () => {
    const target = path.resolve(__dirname, 'src/public/images/menus');
    const destination = path.resolve(__dirname, 'dist/images/menus');

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    fs.readdirSync(target)
        .forEach((image) => {
            sharp(`${target}/${image}`)
                .resize(480)
                .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
                    .slice(0, -1)
                    .join('.')}-large.jpg`));

            sharp(`${target}/${image}`)
                .resize(200)
                .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
                    .slice(0, -1)
                    .join('.')}-small.jpg`));
        });
};

module.exports = {
    generateMenusImage,
};
