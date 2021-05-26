import CONFIG from '../globals/config';

const endPoints = {
    listRestaurant: `${CONFIG.BASE_URL}list`,
    detailRestaurant: `${CONFIG.BASE_URL}detail/`,
};

const getListRestauran = () => fetch(endPoints.listRestaurant);
const getRestaurantDetail = (id) => fetch(`${endPoints.detailRestaurant}${id}`);

export default {
    getListRestauran,
    getRestaurantDetail,
};
