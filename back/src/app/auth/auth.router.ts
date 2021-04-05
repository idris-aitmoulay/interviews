import { Router } from 'express';
import { check } from 'express-validator/check';
import {
  extractToken,
  generateAccessToken,
  generateRefreshToken,
  loginEP,
  validateToken
} from './auth.controller';


export const authRouter = Router();


authRouter.post('/', [
    check('email').exists().isEmail(),
    check('password').exists().isLength({min: 3, max: 20}),
  ],
  loginEP,
  generateRefreshToken,
  generateAccessToken
);


authRouter.post('/token',
  extractToken,
  validateToken,
  generateAccessToken);
