import { Schema, model } from 'mongoose';
import { ITripRequest } from './tripRequest.interface';

const tripRequestSchema = new Schema<ITripRequest>(
    {
        tripId: {
            type: Schema.Types.ObjectId,
            ref: 'Trip',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// Create Model
export const TripRequest = model<ITripRequest>(
    'TripRequest',
    tripRequestSchema,
);
