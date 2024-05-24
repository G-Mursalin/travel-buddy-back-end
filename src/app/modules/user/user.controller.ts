import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendSuccessResponse from '../../utils/sendSuccessResponse';

const getMe = catchAsync(async (req, res) => {
    const result = await userServices.getMe(req.user);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User is retrieved successfully',
        data: result,
    });
});

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

export const userControllers = {
    getMe,
    changeStatus,
};
