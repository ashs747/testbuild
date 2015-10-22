import Routes from './Routes.jsx';
import Router from 'react-router-ie8';

const enclosedRouter = Router.create({
  routes: Routes,
  location: Router.HashLocation
});

export default enclosedRouter;
