import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { tripRequestControllers } from './tripRequest.controller';
import validateRequest from '../../middlewares/validateRequest';
import { tripRequestValidations } from './tripRequest.validation';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(tripRequestValidations.createTripRequestSchema),
    tripRequestControllers.createTripRequest,
);

export const tripRequestRoutes = router;
