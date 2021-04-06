import { check } from 'express-validator/check';

export const createContractValidator = [
  check('startDate').exists().isDate(),
  check('options').exists().isArray({ min: 1 }),
  check('clientIds').exists().isArray({ min: 1 }),
  check('endDate').isDate(),
  check('description').isString(),
];

export const echeanceContractValidator = [
  check('terminationDate').exists().isDate(),
];

