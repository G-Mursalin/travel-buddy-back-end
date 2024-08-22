import { JwtPayload } from 'jsonwebtoken';
import { TTrip } from './trip.interface';
import { Trip } from './trip.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { tripSearchAbleFields } from './trip.constant';

// Create Trip
const createTrip = async (user: JwtPayload, payload: TTrip) => {
    const newTrip = await Trip.create({ ...payload, userId: user.id });

    return newTrip;
};

// Get All Trips
const getAllTrips = async (query: Record<string, unknown>) => {
    const tripsQuery = new QueryBuilder(Trip.find(), query)
        .search(tripSearchAbleFields)
        .filter()
        .minPrice()
        .maxPrice()
        .sort()
        .paginate()
        .fields();

    const result = await tripsQuery.modelQuery;
    const meta = await tripsQuery.countTotal();

    return { result, meta };
};

// Get Trip By ID
const getTrip = async (id: string) => {
    const result = await Trip.findById(id);

    return result;
};

// Get Login User Trips
const getLoginUserTrips = async (user: JwtPayload) => {
    const result = await Trip.find({ userId: user.id }).sort('-createdAt');

    return result;
};

// Delete A Trip
const deleteTrip = async (id: string) => {
    const result = await Trip.findByIdAndDelete(id);

    return result;
};

// Update Trip
const updateTrip = async (id: string, payload: Partial<TTrip>) => {
    const result = await Trip.findByIdAndUpdate(
        id,
        { ...payload },
        {
            new: true,
            runValidators: true,
        },
    );

    return result;
};

export const tripServices = {
    createTrip,
    getAllTrips,
    getTrip,
    getLoginUserTrips,
    deleteTrip,
    updateTrip,
};
