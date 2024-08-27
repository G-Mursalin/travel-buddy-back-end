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
    .get('/', auth(USER_ROLE.admin), userControllers.getAllUsers)
    .post(
        '/change-status/:id',
        auth(USER_ROLE.admin),
        validateRequest(userValidators.changeStatusValidationSchema),
        userControllers.changeStatus,
    )
    .post(
        '/change-role/:id',
        auth(USER_ROLE.admin),
        validateRequest(userValidators.changeRoleValidationSchema),
        userControllers.changeRole,
    )
    .patch(
        '/update-me',
        auth(USER_ROLE.user, USER_ROLE.admin),
        validateRequest(userValidators.updateProfileValidationSchema),
        userControllers.updateMyProfile,
    );

export const userRoutes = router;
