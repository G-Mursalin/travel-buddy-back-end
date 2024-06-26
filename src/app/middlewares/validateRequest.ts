import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const { body } = await schema.parseAsync({
                body: req.body,
                // cookies: req.cookies,
            });
            if (body) {
                req.body = body;
            }
            // if (cookies) {
            //     req.cookies = cookies;
            // }

            next();
        },
    );
};

export default validateRequest;
