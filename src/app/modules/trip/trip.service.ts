import { JwtPayload } from 'jsonwebtoken';
import { TTrip } from './trip.interface';
import { Trip } from './trip.model';

// Create Trip
const createTrip = async (user: JwtPayload, payload: TTrip) => {
    const newTrip = await Trip.create({ ...payload, userId: user.id });

    return newTrip;
};

// Get All Trips
const getAllTrips = async () => {
    const result = await Trip.find();

    return result;
};

export const tripServices = {
    createTrip,
    getAllTrips,
};
