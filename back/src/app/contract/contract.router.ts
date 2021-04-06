import { Router } from 'express';
import { createContract, getContract } from "./contract.controller";
import { createContractValidator } from "./contract.validator";
import { authorize, permissions } from "../shared";


export const contractRouter = Router();

contractRouter.post('/', createContractValidator, authorize(permissions.CONTRACT__W), createContract);
contractRouter.get('/:id', authorize(permissions.CONTRACT__R), getContract);
