import { NextFunction, Request, Response } from 'express';
import {intersection} from "../utils/ArrayUtils";

export const authorize = (role: string) => {
    const isAllowed = (roles: string []) => roles.indexOf(role) > -1;
    return (req: Request, res: Response, next: NextFunction) => {
        if ((req as any).user && isAllowed((req as any).user.roles)) {
            next();
        } else {
            res.status(403).json({message: 'User not allowed'}); // user is forbidden
        }
    };
};



export const authorizes = (roles: string []) => {
    const isAllowed = (userRoles: string []) => (intersection(roles, userRoles).length !== 0);
    return (req: Request, res: Response, next: NextFunction) => {
        if ((req as any).user && isAllowed((req as any).user.roles)) {
            next();
        } else {
            res.status(403).json({message: 'User not allowed'}); // user is forbidden
        }
    };
};
