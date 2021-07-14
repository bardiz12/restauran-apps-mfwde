import CONFIG from '../globals/config';

const endPoints = {
    listRestaurant: `${CONFIG.BASE_URL}list`,
    detailRestaurant: `${CONFIG.BASE_URL}detail/`,
    review: `${CONFIG.BASE_URL}review/`,
};

const getListRestauran = () => fetch(endPoints.listRestaurant);
const getRestaurantDetail = (id) => fetch(`${endPoints.detailRestaurant}${id}`);
const postReview = (payload) => fetch(endPoints.review, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_TOKEN,
    },
    body: JSON.stringify(payload),
});
export default {
    getListRestauran,
    getRestaurantDetail,
    postReview,
};
