import RestaurantApi from './RestaurantApi';

import CONFIG from '../globals/config';

const fetchProxy = async (fetchPromise) => {
    let response = null;
    try {
        response = await fetchPromise();
        if (!response.ok) {
            window.location.hash = '#/404';
            return null;
        }
    } catch (e) {
        window.location.hash = '#/offline';
        return null;
    }

    return response.json();
};

const getListRestauran = async () => {
    const data = await fetchProxy(() => RestaurantApi.getListRestauran());
    return data;
};

const getRestaurantDetail = async (id) => {
    const data = await fetchProxy(() => RestaurantApi.getRestaurantDetail(id));
    if (data !== null) {
        data.restaurant.imagesUrl = CONFIG.generateImageUrlObject(data.restaurant.pictureId);
    }
    return data;
};

export default {
    getListRestauran,
    getRestaurantDetail,
};
