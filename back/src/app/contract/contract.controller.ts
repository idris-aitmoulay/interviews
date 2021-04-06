import {Request, Response} from "express";
import { isEmpty, uniq } from 'lodash';
import {getCustomRepository, In} from "typeorm";
import { ContractRepository } from "./contract.repository";
import { UserRepository } from "../user/user.repository";
import { ContractOptionRepository } from "../contract-option/contract-option.repository";
import { errorMessages } from "../shared";
import { RoleStatus } from "../role/constants";
import { ContractStatus } from "./constants";

export const createContract = async (req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);
  const contractRepository = getCustomRepository(ContractRepository);
  const contractOptionRepository = getCustomRepository(ContractOptionRepository);
  const { clientIds, options: givenOptions, ...contract } = req.body as { clientIds: number[], options: string[] };
  const users = await userRepository.findByIds(clientIds);

  if (isEmpty(users)) {
    return res.status(400).json({typeError: 'Error', error: errorMessages['contracts/clients-not-found']});
  }

  const noBasicUsers = users.filter(({ role }) => role.status !== RoleStatus.BASIC).map(({ id }) => id);
  if (!isEmpty(noBasicUsers)) {
    return res.status(400).json({ typeError: 'Error', error: `${errorMessages['contracts/user-not-client']} : ${noBasicUsers.join(",")}` });
  }

  const errors: string[] = [];
  const contractUsers = await userRepository
    .createQueryBuilder('user')
    .where("user.id IN (:...ids)", { ids: clientIds })
    .innerJoinAndSelect("user.contracts", "contract", "contract.status in (:...status)", { status: [ContractStatus.PENDING, ContractStatus.ACTIVE] })
    .innerJoinAndSelect("contract.contractOptions", "contractOption", "contractOption.code IN (:...codes)", { codes: givenOptions })
    .getMany();


  for await (const contractUser of contractUsers) {
    const { id } = contractUser;
    const contractByUser = await contractUser.contracts;
    const contractOptions = await Promise.all(contractByUser.map(({ contractOptions }) => contractOptions));
    const uniqueOption = uniq(contractOptions.reduce((cm ,cv) => [...cm, ...cv], []).map(({ code }) => code));
    if (!isEmpty(uniqueOption)) errors.push(`[ ${id} / ${uniqueOption.join(',')}]`)
  }

  if (!isEmpty(errors)) {
    return res.status(400)
      .json({
        typeError: 'Error',
        error: `${errorMessages['contracts/option-already-exist']} : ${errors.join(",")}`
      }
      );
  }
  
  const options = await contractOptionRepository.find({ where: { code: In(givenOptions) }});
  let persistedContract = contractRepository.create({ ...contract });
  persistedContract.users = Promise.all(users);
  persistedContract.contractOptions = Promise.all(options);
  const data = await contractRepository.save(persistedContract);
  return res.status(200).json({ success: true, data });
};
