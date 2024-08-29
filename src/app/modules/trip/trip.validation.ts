import { z } from 'zod';
import { travelType } from './trip.constant';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const photoSchema = z.object({
    id: z.number(),
    image: z.string().url({ message: 'Invalid photo URL' }),
});

const createTripSchema = z.object({
    body: z.object({
        title: z.string(),
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
        numberOfBookingSpot: z
            .number()
            .min(1, { message: 'Number of booking spot cannot be empty' })
            .refine((value) => value >= 0, {
                message: 'Number of booking spot must be a non-negative number',
            }),
        maxNumberOfPeople: z
            .number()
            .min(1, { message: 'Max number of people cannot be empty' })
            .refine((value) => value >= 0, {
                message: 'Max number of people must be a non-negative number',
            }),
        travelType: z.enum([...travelType] as [string, ...string[]], {
            required_error: 'Travel Types is required',
            invalid_type_error:
                'Travel Types must be one of: Adventure or Relaxation or Cultural or Family or Business',
        }),
        photos: z
            .array(photoSchema, {
                required_error: 'Photos is required',
                invalid_type_error: 'Photos must be an array of object',
            })
            .min(1, { message: 'At least one photo object is required' }),
    }),
});

const updateTripSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        destination: z.string().optional(),
        description: z.string().optional(),
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
            )
            .optional(),
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
            )
            .optional(),
        budget: z.number().positive().optional(),
        numberOfBookingSpot: z
            .number()
            .min(1, { message: 'Number of booking spot cannot be empty' })
            .refine((value) => value >= 0, {
                message: 'Number of booking spot must be a non-negative number',
            })
            .optional(),
        maxNumberOfPeople: z
            .number()
            .min(1, { message: 'Max number of people cannot be empty' })
            .refine((value) => value >= 0, {
                message: 'Max number of people must be a non-negative number',
            })
            .optional(),
        travelType: z
            .enum([...travelType] as [string, ...string[]], {
                required_error: 'Travel Types is required',
                invalid_type_error:
                    'Travel Types must be one of: adventure or leisure or business',
            })
            .optional(),
        photos: z
            .array(photoSchema)
            .min(1, { message: 'At least one photo object is required' }),
    }),
});

export const tripValidations = {
    createTripSchema,
    updateTripSchema,
};
