import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../classes/errorClasses/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { jwtHelpers } from '../helpers/jwtHelpers';
import { UserStatus } from '../modules/user/user.constant';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;

            // Check if the token send from client
            if (!token) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You are not authorize',
                );
            }

            // Check if the token is verified
            const decoded = jwtHelpers.verifyToken(
                token,
                config.jwt_access_secret,
            );

            const { email, role, iat } = decoded;

            // Check if the user exist in database
            const user = await User.isUserExistsByEmail(email);

            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
            }

            // Check if the user is blocked
            if (user.status === UserStatus[1]) {
                throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
            }

            // Check if the password changed recently and token is older then token is invalid
            if (
                user.passwordChangedAt &&
                User.isJWTIssuedBeforePasswordChanged(
                    user.passwordChangedAt,
                    iat as number,
                )
            ) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You are not authorize',
                );
            }

            // Check if correct role base user accessing correct role base resources
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You are not authorize',
                );
            }

            req.user = decoded;

            next();
        },
    );
};

export default auth;
