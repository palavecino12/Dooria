import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../errors/AppError";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {
        //Dejamos que lo maneje el error handler.
        return next(new AppError(result.error.issues[0].message, 400));
    }

    req.body = result.data; //Ya validado y tipado
    next();
};