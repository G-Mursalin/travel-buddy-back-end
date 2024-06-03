import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../classes/errorClasses/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';

// Get me
const getMe = async (payload: JwtPayload) => {
    const { email, role } = payload;

    let result = null;
    if (role === 'user') {
        result = await User.findOne({ email }).select({
            _id: 1,
            userName: 1,
            email: 1,
            status: 1,
            role: 1,
        });
    }

    if (role === 'admin') {
        result = await User.findOne({ email }).select({
            _id: 1,
            userName: 1,
            email: 1,
            status: 1,
            role: 1,
        });
    }

    return result;
};

// Change User Status
const changeStatus = async (id: string, status: string) => {
    // Check if the user exists
    const isUserExists = await User.findById(id);

    if (!isUserExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
    }

    const result = await User.findByIdAndUpdate(
        id,
        { status },
        {
            new: true,
            runValidators: true,
        },
    ).select({ _id: 1, userName: 1, email: 1, status: 1, role: 1 });

    return result;
};

// Change User Role
const changeRole = async (id: string, role: string) => {
    // Check if the user exists
    const isUserExists = await User.findById(id);

    if (!isUserExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
    }

    const result = await User.findByIdAndUpdate(
        id,
        { role },
        {
            new: true,
            runValidators: true,
        },
    ).select({ _id: 1, userName: 1, email: 1, status: 1, role: 1 });

    return result;
};

// Update My Profile
const updateMyProfile = async (id: string, payload: Partial<TUser>) => {
    const { userName } = payload;

    const result = await User.findByIdAndUpdate(
        id,
        { userName },
        {
            new: true,
            runValidators: true,
        },
    ).select({ _id: 1, userName: 1, email: 1, status: 1, role: 1 });

    return result;
};

// Get All Users
const getAllUsers = async () => {
    const result = await User.find().select({
        _id: 1,
        userName: 1,
        email: 1,
        status: 1,
        role: 1,
    });

    return result;
};

export const userServices = {
    getMe,
    changeStatus,
    changeRole,
    updateMyProfile,
    getAllUsers,
};
