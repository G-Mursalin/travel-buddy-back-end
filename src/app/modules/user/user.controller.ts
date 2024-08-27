import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendSuccessResponse from '../../utils/sendSuccessResponse';

// Get Me
const getMe = catchAsync(async (req, res) => {
    const result = await userServices.getMe(req.user);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User is retrieved successfully',
        data: result,
    });
});

// Change User Status
const changeStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await userServices.changeStatus(id, status);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Status is updated successfully',
        data: result,
    });
});

// Change User Status
const changeRole = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    const result = await userServices.changeRole(id, role);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Role is updated successfully',
        data: result,
    });
});

// Update Profile
const updateMyProfile = catchAsync(async (req, res) => {
    const { id } = req.user;

    const result = await userServices.updateMyProfile(id, req.body);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User info. updated successfully',
        data: result,
    });
});

// Get All Users
const getAllUsers = catchAsync(async (req, res) => {
    const result = await userServices.getAllUsers();

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Users retrieved successfully',
        data: result,
    });
});

export const userControllers = {
    getMe,
    changeStatus,
    changeRole,
    updateMyProfile,
    getAllUsers,
};
