import { Application, NextFunction, Request, Response } from 'express';
import { authRouter } from '../auth/auth.router';
import { addUserToRequest, tokenInterceptor } from '../auth/auth.controller';
import { usersRouter } from '../user/user.router';

export function initPublicRoutes(app: Application) {
    app.use('/api/auth', authRouter);
}

export function initSecuredRoutes(app: Application) {
    app.use('/api/users', usersRouter);
}

export function initErrorRoutes(app: Application) {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const status = (err && (err.status || err.statusCode)) || 500;
        const error = err && (err.message || err.toString());
        const code = err && err.code;
        res.status(status).json({status, error, code});
    });
}

export function secureRoutes(app: Application) {
    app.use(tokenInterceptor, addUserToRequest);
}

