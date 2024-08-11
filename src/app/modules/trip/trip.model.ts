import { Schema, model } from 'mongoose';
import { TTrip } from './trip.interface';

const tripSchema = new Schema<TTrip>(
    {
        destination: { type: String, required: true },
        description: { type: String, required: true },
        startDate: {
            type: String,
            required: true,
            match: /^\d{4}-\d{2}-\d{2}$/,
        },
        endDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
        budget: { type: Number, required: true, min: 0 },
        travelType: {
            type: String,
            required: true,
            enum: ['adventure', 'leisure', 'business'],
        },
        photo: {
            type: [String],
            validate: {
                validator: function (array) {
                    return (
                        Array.isArray(array) &&
                        array.length > 0 &&
                        array.every((url: string) => {
                            const urlRegex =
                                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                            return urlRegex.test(url);
                        })
                    );
                },
                message: 'At least one valid photo URL is required',
            },
            required: [true, 'At least one photo URL is required'],
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
export const Trip = model<TTrip>('Trip', tripSchema);
