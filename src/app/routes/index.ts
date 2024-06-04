import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { tripRoutes } from '../modules/trip/trip.routes';
import { tripRequestRoutes } from '../modules/tripRequest/tripRequest.routes';

const globalRoute = Router();

const routes = [
    { path: '/auth', route: authRoutes },
    { path: '/user', route: userRoutes },
    { path: '/trip', route: tripRoutes },
    { path: '/trip-request', route: tripRequestRoutes },
];

routes.forEach((route) => globalRoute.use(route.path, route.route));

export default globalRoute;
