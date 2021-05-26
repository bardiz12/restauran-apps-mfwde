import DB from './DB';

const OBJECT_STORE_NAME = DB.OBJECT_STORE_NAME.restaurants;

const add = async (restaurant) => {
    const {
        id, name, description, pictureId, city, rating,
    } = restaurant;

    const restoDB = (await DB.savedRestaurantDB);
    return restoDB.add(OBJECT_STORE_NAME, {
        id, name, description, pictureId, city, rating,
    });
};

const remove = async (id) => {
    const restoDB = (await DB.savedRestaurantDB);
    return restoDB.delete(OBJECT_STORE_NAME, id);
};

const getAll = async () => {
    const restoDB = (await DB.savedRestaurantDB);
    return restoDB.getAll(OBJECT_STORE_NAME);
};

const checkIsSaved = async (id) => {
    const ids = Array.isArray(id) ? id : [id];
    const isSaved = {};
    ids.forEach((currentId) => {
        isSaved[currentId] = false;
    });
    const restoDB = (await DB.savedRestaurantDB);

    // eslint-disable-next-line max-len
    const results = await Promise.all(ids.map((currentId) => restoDB.get(OBJECT_STORE_NAME, currentId)));

    results.forEach((item) => {
        if (item !== undefined) {
            isSaved[item.id] = true;
        }
    });
    return isSaved;
};

export default {
    add,
    remove,
    getAll,
    checkIsSaved,
};
