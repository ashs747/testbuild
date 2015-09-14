import Routes from './Routes.jsx';
import Router from 'react-router-ie8';

export default Router.create({
  routes: Routes,
  location: Router.HashLocation
});
