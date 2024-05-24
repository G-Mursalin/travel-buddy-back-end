import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { userControllers } from './user.controller';
import { userValidators } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router
    .get(
        '/get-me',
        auth(USER_ROLE.user, USER_ROLE.admin),
        userControllers.getMe,
    )
    .post(
        '/change-status/:id',
        auth(USER_ROLE.user, USER_ROLE.admin),
        validateRequest(userValidators.changeStatusValidationSchema),
        userControllers.changeStatus,
    );

export const userRoutes = router;
