import availablePhotos from '../../data/menus.json';

export default {
    availablePhotos,
    getPhotoUrl: (name, type = 'foods', size = null) => {
        const key = name.toLowerCase();
        const image = key in availablePhotos ? availablePhotos[key] : null;

        if (image === null) {
            return type === 'drinks' ? './images/icons/no-drinks.jpeg' : './images/icons/no-food.png';
        }

        if (size) {
            const partitions = image.split('.');
            return `${partitions.slice(0, partitions.length - 1).join('')}-${size}.jpg`;
        }

        return image;
    },
};
