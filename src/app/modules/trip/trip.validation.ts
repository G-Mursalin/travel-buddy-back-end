import { z } from 'zod';
import { travelType } from './trip.constant';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const createTripSchema = z.object({
    body: z.object({
        destination: z.string(),
        description: z.string(),
        startDate: z
            .string()
            .regex(dateRegex, {
                message: 'Invalid startDate format. Use YYYY-MM-DD',
            })
            .refine(
                (dateString) => {
                    const date = new Date(dateString);
                    return !isNaN(date.getTime());
                },
                { message: 'Invalid startDate value' },
            ),
        endDate: z
            .string()
            .regex(dateRegex, {
                message: 'Invalid endDate format. Use YYYY-MM-DD',
            })
            .refine(
                (dateString) => {
                    const date = new Date(dateString);
                    return !isNaN(date.getTime());
                },
                { message: 'Invalid endDate value' },
            ),
        budget: z.number().positive(),
        travelType: z.enum([...travelType] as [string, ...string[]], {
            required_error: 'Travel Types is required',
            invalid_type_error:
                'Travel Types must be one of: adventure or leisure or business',
        }),
        photo: z.string().url({ message: 'Invalid photo URL' }),
    }),
});

export const tripValidations = {
    createTripSchema,
};
