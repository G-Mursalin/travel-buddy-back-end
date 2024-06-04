import { z } from 'zod';
import { Types } from 'mongoose';

const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});

const createTripRequestSchema = z.object({
    body: z.object({
        tripId: objectId,
        userId: objectId,
    }),
});

export const tripRequestValidations = {
    createTripRequestSchema,
};
