import { Router } from 'express';
import { getContractOptions } from "./contract-option.controller";


export const contractOptionRouter = Router();

contractOptionRouter.get('/', getContractOptions);
