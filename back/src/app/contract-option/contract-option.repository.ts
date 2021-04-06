import { EntityRepository, Repository } from 'typeorm';
import ContractOption from "./contract-option.entity";

@EntityRepository(ContractOption)
export class ContractOptionRepository extends Repository<ContractOption> {}
