import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import { authServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
    const { accessToken } = await authServices.registerUser(req.body);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User is sign up successfully',
        data: accessToken,
    });
});

const loginUser = catchAsync(async (req, res) => {
    const { accessToken } = await authServices.loginUser(req.body);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User is login successfully',
        data: { accessToken },
    });
});

const changeUserPassword = catchAsync(async (req, res) => {
    const result = await authServices.changeUserPassword(req.user, req.body);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Password changed successfully',
        data: result,
    });
});

export const authControllers = {
    registerUser,
    loginUser,
    changeUserPassword,
};
