import { Schema, model } from 'mongoose';
import { ITripRequest } from './tripRequest.interface';
import { TripStatus } from './tripRequest.constant';

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
        status: {
            type: String,
            enum: { values: TripStatus },
            default: 'pending',
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
