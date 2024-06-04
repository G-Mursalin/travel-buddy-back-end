import { JwtPayload } from 'jsonwebtoken';
import { ITripRequest } from './tripRequest.interface';
import { TripRequest } from './tripRequest.model';

// Create Trip
const createTripRequest = async (user: JwtPayload, payload: ITripRequest) => {
    const newRequestTrip = await TripRequest.create(payload);

    return newRequestTrip;
};

// Get All Trips that a user requested
const getRequestedTrips = async (user: JwtPayload) => {
    const result = await TripRequest.find({ userId: user.id })
        .populate('tripId')
        .sort('-createdAt');

    return result;
};

export const tripRequestServices = {
    createTripRequest,
    getRequestedTrips,
};
