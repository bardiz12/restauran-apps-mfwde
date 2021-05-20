import CONFIG from '../globals/config';

const endPoints = {
    listRestaurant: `${CONFIG.BASE_URL}list`,
};

const getListRestauran = () => fetch(endPoints.listRestaurant);

export default {
    getListRestauran,
};
