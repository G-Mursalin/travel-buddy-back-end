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

// Get Login User Trips
const getLoginUserTrips = catchAsync(async (req: Request, res: Response) => {
    const result = await tripServices.getLoginUserTrips(req.user);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User posts retrieved successfully',
        data: result,
    });
});

// Delete A Trip
const deleteTrip = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await tripServices.deleteTrip(id);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Posts deleted successfully',
        data: result,
    });
});

// Update Trip
const updateTrip = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await tripServices.updateTrip(id, req.body);

    sendSuccessResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Post updated successfully',
        data: result,
    });
});
export const tripControllers = {
    createTrip,
    getAllTrips,
    getTrip,
    getLoginUserTrips,
    deleteTrip,
    updateTrip,
};
