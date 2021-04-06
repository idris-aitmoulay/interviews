import { Router } from 'express';
import {createContract, getContract, terminateContract} from "./contract.controller";
import { createContractValidator } from "./contract.validator";
import { authorize, permissions } from "../shared";


export const contractRouter = Router();

contractRouter.post('/', createContractValidator, authorize(permissions.CONTRACT__W), createContract);

contractRouter.get('/:id', authorize(permissions.CONTRACT__R), getContract);

contractRouter.patch('/:id', authorize(permissions.CONTRACT__U_TERMINATING), terminateContract);
