import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import AppError from '../../classes/errorClasses/AppError';
import { StatusCodes } from 'http-status-codes';
import { UserStatus } from '../user/user.constant';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { TUser } from '../user/user.interface';

const registerUser = async (payload: TUser) => {
    const { userName, email, password } = payload;

    const user = await User.create({ userName, email, password });

    // Access Granted: Send Access Token
    const jwtPayload = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtHelpers.createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expired_in as string,
    );

    return {
        accessToken,
    };
};

const loginUser = async (payload: TLoginUser) => {
    const { email, password } = payload;

    // Check if the user exist in database
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    // Check if the user is blocked
    if (user.status === UserStatus[1]) {
        throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
    }

    // Check Password is correct
    if (!(await User.isPasswordMatched(password, user.password))) {
        throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
    }

    // Access Granted: Send Access Token
    const jwtPayload = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtHelpers.createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expired_in as string,
    );

    return {
        accessToken,
    };
};

const changeUserPassword = async (
    user: JwtPayload,
    payload: TChangePassword,
) => {
    // Check if the user exist in database
    const userData = await User.isUserExistsByEmail(user.email);
    if (!userData) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    // Check if the user is blocked
    if (userData.status === UserStatus[1]) {
        throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
    }

    // Check the old Password is correct
    if (
        !(await User.isPasswordMatched(payload.oldPassword, userData.password))
    ) {
        throw new AppError(StatusCodes.FORBIDDEN, 'Invalid Old Password');
    }

    // Update the password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt),
    );

    await User.findOneAndUpdate(
        {
            id: user.userId,
            role: user.role,
        },
        {
            password: newHashedPassword,
            passwordChangedAt: new Date(),
        },
    );

    return null;
};

export const authServices = {
    registerUser,
    loginUser,
    changeUserPassword,
};
