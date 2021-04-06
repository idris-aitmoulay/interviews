import { validationResult } from 'express-validator/check';
import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import User from '../user/user.entity';
import { errorMessages, UserAuth, UserDetails, environment } from '../shared';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import Role from '../role/role.entity';
import * as bcrypt from 'bcryptjs';
import moment = require('moment');


export async function loginEP(req: Request, res: Response, next: NextFunction) {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(404).json({typeError: 'validation', error: err.array()});
        }
        const userQuery: User = req.body as User;
        const userRepository = getCustomRepository(UserRepository);
        const user: (User | undefined) = await userRepository.findByEmail(userQuery.email);
        if (user) {
            bcrypt.compare(userQuery.password, user.password, (err: Error, succes) => {
                if (succes) {
                    (req as any).user = user;
                    next();
                } else {
                    res.status(401).json({success: false, message: errorMessages['auth/auth-error']});
                }
            });

        } else {
            res.status(401).json({success: false, message: errorMessages['auth/auth-error']});
        }
    } catch (error) {
        console.error(error);
    }
}


export async function generateRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        (req as any).token = {};
        const refreshtoken = `${(req as any).user.id}.${crypto.randomBytes(40).toString('hex')}`;
        (req as any).token.refreshToken = refreshtoken;
        const userRepository = getCustomRepository(UserRepository);
        const tokenToSave: object = {
            token: refreshtoken,
            issuedAt: Date.now(),
            expiredAt: moment().add(environment.jwt.refreshTokenExpire, 'days').toDate(),
        };
        await userRepository.updateRefreshTokenById((req as any).user.id, tokenToSave);
        next();
    } catch (e) {
        console.error(e);
    }
}

export async function generateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        const userAuth: UserAuth = await mapUserToTokenSignature((req as any).user);
        (req as any).token.accessToken = jwt.sign(userAuth, environment.jwt.secret, {expiresIn: environment.jwt.accessTokenExpire});
        res.status(200).json({success: true, content: {token: (req as any).token}});
    } catch (e) {
        console.error(e);
    }
}

const mapUserToTokenSignature = async (user: User): Promise<UserAuth> => {
    const {id, email } = user;
    const role: Role = user.role;
    const userDetails: UserDetails = {
        id,
        email,
    };
    const permissions: any[] = role.permissions;
    return {
        user: userDetails,
        role: [role.status],
        permissions: permissions.filter(permission => !permission.archived).map(permission => permission.code)
    };
};

export function extractToken(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;
    if (tokenHeader !== undefined) {
        const accessToken = tokenHeader.split(' ')[1];
        (req as any).token = {};
        (req as any).token.accessToken = accessToken;
        next();
    } else {
        res.status(403).json({success: false, message: errorMessages['auth/access-token']});
    }
}


export function validateToken(req: Request, res: Response, next: NextFunction) {
    if (req.body.forceRefresh == true) {
        // @ts-ignore
      jwt.verify((req as any).token.accessToken, environment.jwt.secret, async (err: JsonWebTokenError, payload: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    (req as any).user = (jwt.decode((req as any).token.accessToken) as UserAuth).user;
                    try {
                        const user = await validateRefreshToken(req, res);
                        if (user) {
                            (req as any).user = user;
                            next();
                        } else {
                            res.status(404).json({succes: false, message: errorMessages['auth/refresh-token']});
                        }
                    } catch (e) {
                        res.status(401).json({success: false, message: e.message});
                    }
                } else {
                    res.status(401).json({success: false, message: err});
                }
            } else {
                res.status(200).json({success: false, message: errorMessages['auth/access-token-valid']});
            }
        });
    } else {
        next();
    }
}


function validateRefreshToken(req: Request, res: Response): Promise<User | undefined> {
    let refreshToken = req.body.refreshToken;
    if (req.body.forceRefresh === undefined) {
        refreshToken = (req as any).token.refreshToken;
    }
    (req as any).token.refreshToken = refreshToken;
    const user: User = (req as any).user;
    const userRepository = getCustomRepository(UserRepository);
    return new Promise<any>((resolve, reject) => {
        userRepository.findOne({id: user.id}).then(async (result: (User | undefined)) => {
            if (result && result.refreshToken && (result.refreshToken as any).token === refreshToken) {
                const today = moment(new Date());
                const tokenExpirationDate = moment((result.refreshToken as any).expiredAt);
                if (today.isBefore(tokenExpirationDate) || today === tokenExpirationDate) {
                    resolve(result);
                } else {
                    reject({
                        message: 'Refresh token expired'
                    });
                }

            } else {
                reject({
                    message: 'No User fo that id'
                });
            }
        }).catch(reason => {
            reject(reason);
        });
    });
}


export function addUserToRequest(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;
    if (tokenHeader !== undefined) {
        const tokenAccess = tokenHeader.split(' ')[1];
        return jwt.verify(tokenAccess, environment.jwt.secret, (err, decoded) => {
            if (err) {
                res.status(403).json({success: false, message: errorMessages['auth/access-token']});
            }
            (req as any).user = decoded as UserAuth;
            return next();
        });
    } else {
        res.status(403).json({success: false, message: errorMessages['auth/access-token']});
    }
}

export function tokenInterceptor(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;
    if (typeof tokenHeader !== 'undefined') {
        let accessToken: string = '';
        if (typeof tokenHeader === 'string')
            accessToken = tokenHeader.split(' ')[1];
        (req as any).token = {};
        (req as any).token.accessToken = accessToken;
        // @ts-ignore
      jwt.verify((req as any).token.accessToken, environment.jwt.secret, (err: JsonWebTokenError, payload: any) => {
            if (err) {
                return res.status(401).json({success: false, authenticated: false, test: false});
            }
            (req as any).user = jwt.decode((req as any).token.accessToken);
            return next();
        });
    } else {
        res.status(403).json({success: false, message: 'forbidden'});
    }
}
