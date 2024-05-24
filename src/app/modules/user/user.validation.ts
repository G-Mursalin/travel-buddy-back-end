import { z } from 'zod';
import { UserStatus } from './user.constant';

const createUserValidationSchema = z.object({
    body: z.object({
        userName: z
            .string({
                required_error: 'User name is required',
                invalid_type_error: 'User name must be a string',
            })
            .min(1, 'User name is required'),
        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .min(1, 'Password is required'),
        email: z
            .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
            .email('Invalid email address')
            .min(1, 'Email is required'),
    }),
});

const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...UserStatus] as [string, ...string[]], {
            required_error: 'Status is required',
            invalid_type_error: 'Status must be one of: in-progress or blocked',
        }),
    }),
});

export const userValidators = {
    createUserValidationSchema,
    changeStatusValidationSchema,
};
