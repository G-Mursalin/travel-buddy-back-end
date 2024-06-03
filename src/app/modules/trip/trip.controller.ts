import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import { tripServices } from './trip.service';

// Create User
const createTrip = catchAsync(async (req: Request, res: Response) => {
    const result = await tripServices.createTrip(req.user, req.body);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Trip created successfully',
        data: result,
    });
});

// Get All Trips
const getAllTrips = catchAsync(async (req: Request, res: Response) => {
    const result = await tripServices.getAllTrips();

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Trips retrieved successfully',
        data: result,
    });
});

export const tripControllers = {
    createTrip,
    getAllTrips,
};
