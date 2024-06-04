import { Router } from 'express';
import { tripControllers } from './trip.controller';
import validateRequest from '../../middlewares/validateRequest';
import { tripValidations } from './trip.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router
    .post(
        '/',
        auth(USER_ROLE.user),
        validateRequest(tripValidations.createTripSchema),
        tripControllers.createTrip,
    )
    .get('/', tripControllers.getAllTrips)
    .get('/:id', tripControllers.getTrip);

export const tripRoutes = router;
