import { Router } from 'express';
import { createContract } from "./contract.controller";
import { createContractValidator } from "./contract.validator";
import { authorize, permissions } from "../shared";


export const contractRouter = Router();

contractRouter.post('/', createContractValidator, /*authorize(permissions.CONTRACT__W),*/ createContract);
