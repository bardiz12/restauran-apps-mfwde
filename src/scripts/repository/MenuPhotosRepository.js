import availablePhotos from '../../data/menus.json';

export default {
    availablePhotos,
    getPhotoUrl: (name, type = 'foods') => {
        const key = name.toLowerCase();
        const image = key in availablePhotos ? availablePhotos[key] : null;

        if (image === null) {
            return type === 'drinks' ? './images/icons/no-drinks.jpeg' : './images/icons/no-food.png';
        }

        return image;
    },
};
