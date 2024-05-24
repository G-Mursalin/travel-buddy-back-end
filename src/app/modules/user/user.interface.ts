/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
    _id: string;
    userName: string;
    email: string;
    password: string;
    passwordChangedAt: Date;
    status: 'in-progress' | 'blocked';
    role: TUserRole;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        passwordFromReq: string,
        passwordInDB: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimeStamp: Date,
        jwtIssuedTimeStamp: number,
    ): boolean;
}
