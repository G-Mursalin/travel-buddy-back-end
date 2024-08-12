import { Schema, model } from 'mongoose';
import { TPhoto, TTrip } from './trip.interface';

const photoSchema = new Schema<TPhoto>(
    {
        id: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            validate: {
                validator: function (url: string) {
                    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                    return urlRegex.test(url);
                },
                message: 'A valid image URL is required',
            },
            required: [true, 'Image URL is required'],
        },
    },
    { _id: false },
);

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
        photos: {
            type: [photoSchema],
            validate: {
                validator: function (array: TPhoto[]) {
                    return Array.isArray(array) && array.length > 0;
                },
                message: 'At least one photo object is required',
            },
            required: [true, 'Photos array is required'],
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
