import { check } from 'express-validator/check';
import {RoleStatus} from "../role/constants";

export const createUserValidator = [
    check('email').exists().isEmail(),
    check('password').exists().isString().isLength({ min: 4, max: 30 }),
    check('status').exists().isIn([ RoleStatus.BASIC, RoleStatus.ADMIN ]),
];


export const criteriaUsersValidator = [
  check('skip').isNumeric().default(0),
  check('take').isNumeric().default(10)
];

