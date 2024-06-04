import { JwtPayload } from 'jsonwebtoken';
import { ITripRequest } from './tripRequest.interface';
import { TripRequest } from './tripRequest.model';

// Create Trip
const createTripRequest = async (user: JwtPayload, payload: ITripRequest) => {
    const newRequestTrip = await TripRequest.create(payload);

    return newRequestTrip;
};

export const tripRequestServices = {
    createTripRequest,
};
