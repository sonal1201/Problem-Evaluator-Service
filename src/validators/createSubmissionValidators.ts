import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {

        schema.parse(req.body);

        next();
    } catch (error: any) {
        // Handle validation errors
         res.status(400).send({
            success: false,
            message: 'Validation failed',
            data: {},
            error: error.errors || error.message,
        });
    }
};
