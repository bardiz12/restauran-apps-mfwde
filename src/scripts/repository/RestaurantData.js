import RestaurantApi from './RestaurantApi';

import CONFIG from '../globals/config';

const getListRestauran = async () => {
    const data = await (await RestaurantApi.getListRestauran()).json();
    data.restaurants = data.restaurants.map((item) => ({
        ...item,
        pictureId: `${CONFIG.BASE_IMAGE_URL.medium}${item.pictureId}`,
        isSaved: Math.random() > 0.5
    }));
    return data;
};

export default {
    getListRestauran,
};
