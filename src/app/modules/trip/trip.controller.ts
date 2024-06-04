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
    const { result, meta } = await tripServices.getAllTrips(req.query);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Trips retrieved successfully',
        meta: meta,
        data: result,
    });
});

// Get Trip by ID
const getTrip = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await tripServices.getTrip(id);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Trip retrieved successfully',
        data: result,
    });
});

export const tripControllers = {
    createTrip,
    getAllTrips,
    getTrip,
};
