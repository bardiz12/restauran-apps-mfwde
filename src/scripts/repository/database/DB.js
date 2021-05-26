import { openDB } from 'idb';

const DATABASE_NAME = 'eatskuy-apps';
const OBJECT_STORE_NAME = {
    restaurants: 'restaurants',
};
const DB_VERSION = 1;

const savedRestaurantDB = openDB(DATABASE_NAME, DB_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME.restaurants, { keyPath: 'id' });
    },
});

export default {
    OBJECT_STORE_NAME,
    savedRestaurantDB,
};
