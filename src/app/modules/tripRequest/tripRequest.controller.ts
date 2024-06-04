import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import { tripRequestServices } from './tripRequest.service';

// Create Trip Request
const createTripRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await tripRequestServices.createTripRequest(
        req.user,
        req.body,
    );

    sendSuccessResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Trip request send successfully',
        data: result,
    });
});

export const tripRequestControllers = {
    createTripRequest,
};
