import { NextFunction, Request, Response } from 'express';
import { intersection } from "../";

const isAllowed = <Type>(grantAccess: Type [], givenAccess: Type) => grantAccess.indexOf(givenAccess) > -1;

export const authorize = (permission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if ((req as any).user && isAllowed((req as any).user.permissions, permission)) {
            next();
        } else {
            res.status(403).json({message: 'User not allowed'}); // user is forbidden
        }
    };
};



export const roleAuthorized = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if ((req as any).user && isAllowed((req as any).user.role, role)) {
            next();
        } else {
            res.status(403).json({message: 'User not allowed'}); // user is forbidden
        }
    };
};

