import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ContractOptionRepository } from "./contract-option.repository";

export const getContractOptions = async (req: Request, res: Response) => {
  const contractOptionRepository = getCustomRepository(ContractOptionRepository);
  const data = await contractOptionRepository.find();
  return res.status(200).json({success: true, data });
};
