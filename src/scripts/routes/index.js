import {
    Home, NotFound, Detail, Favorite, Offline,
} from '../pages';

const routes = {
    '/': Home,
    '/404': NotFound,
    '/detail/:id': Detail,
    '/favorite': Favorite,
    '/offline': Offline,
};

export default routes;
