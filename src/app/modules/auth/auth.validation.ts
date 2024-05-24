import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
            .email('Invalid email address')
            .min(1, 'Email is required'),
        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .min(1, 'Password is required'),
    }),
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z
            .string({
                required_error: 'Old password is required',
                invalid_type_error: 'Old password must be a string',
            })
            .min(1, 'Old password is required'),
        newPassword: z
            .string({
                required_error: 'New password is required',
                invalid_type_error: 'New password must be a string',
            })
            .min(1, 'New password is required'),
    }),
});

export const authValidations = {
    loginValidationSchema,
    changePasswordValidationSchema,
};
