import { getCustomRepository, MoreThan } from "typeorm";
const schedule = require('node-schedule');

import { ContractRepository } from './contract.repository'
import { ContractStatus } from "./constants"
import { environment } from '../shared'

const updateContractStatus = () => {
  const contratcRepository = getCustomRepository(ContractRepository);
  schedule.scheduleJob(environment.appConfig.cron, async () => {
    await contratcRepository.update({ status: ContractStatus.ACTIVE, endDate: MoreThan(new Date()) }, { status: ContractStatus.FINISHED });
    await contratcRepository.update({ status: ContractStatus.PENDING, startDate: MoreThan(new Date()) }, { status: ContractStatus.ACTIVE });
  });
};


export const initContractJob = () => {
  updateContractStatus();
};
