import { z } from 'zod';
import { USER_ROLE, UserStatus } from './user.constant';

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
        profileImage: z
            .string()
            .url({ message: 'Invalid photo URL' })
            .optional(),
        bio: z.string().optional(),
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

const changeRoleValidationSchema = z.object({
    body: z.object({
        role: z.enum([...Object.values(USER_ROLE)] as [string, ...string[]], {
            required_error: 'Role is required',
            invalid_type_error: 'Role must be one of: admin or user',
        }),
    }),
});

const updateProfileValidationSchema = z.object({
    body: z.object({
        userName: z
            .string({
                required_error: 'User name is required',
                invalid_type_error: 'User name must be a string',
            })
            .min(1, 'User name is required')
            .optional(),
        profileImage: z
            .string()
            .url({ message: 'Invalid photo URL' })
            .optional(),
        bio: z.string().optional(),
    }),
});

export const userValidators = {
    createUserValidationSchema,
    changeStatusValidationSchema,
    changeRoleValidationSchema,
    updateProfileValidationSchema,
};
