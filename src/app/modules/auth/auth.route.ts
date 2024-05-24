import express from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { userValidators } from '../user/user.validation';

const router = express.Router();

router
    .post(
        '/register',
        validateRequest(userValidators.createUserValidationSchema),
        authControllers.registerUser,
    )
    .post(
        '/login',
        validateRequest(authValidations.loginValidationSchema),
        authControllers.loginUser,
    )
    .post(
        '/change-password',
        auth(USER_ROLE.user, USER_ROLE.admin),
        validateRequest(authValidations.changePasswordValidationSchema),
        authControllers.changeUserPassword,
    );

export const authRoutes = router;
