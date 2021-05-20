import { Home, NotFound, Detail } from '../pages';

const routes = {
    '/': Home,
    '/404': NotFound,
    '/detail/:id': Detail,
};

export default routes;
