import {Request, Response} from 'express';
import {validationResult} from 'express-validator/check';
import { get, isEqual } from 'lodash';
import {getCustomRepository} from 'typeorm';
import {UserRepository} from './user.repository';
import {RoleRepository} from '../role/role.repository';
import * as bcrypt from 'bcryptjs';
import { errorMessages } from "../shared";
import { RoleStatus } from "../role/constants";

export const createUser = async (req: Request, res: Response) => {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({typeError: 'validation', error: err.array()});
        }
        const roleRepository = getCustomRepository(RoleRepository);
        const userRepository = getCustomRepository(UserRepository);
        const user = req.body;

        if (await userRepository.findByEmail(user.email)) {
          return res.status(400).json({typeError: 'Error', error: errorMessages['users/already-exist']});
        }

        bcrypt.genSalt(10, (err: Error, salt: string) => {
            bcrypt.hash(user.password, salt, async (err: Error, hash: string) => {
                user.password = hash;
                const { status, ...userRest } = user;
                const role = await roleRepository.findByStatus(RoleStatus[status as keyof typeof RoleStatus]);
                const returnedUser: any = userRepository.create({ ...userRest, role });
                const { password, ...data } = await userRepository.save(returnedUser);
                res.status(200).json({success: true, data });
            });
        });
    } catch (e) {
        res.status(400).json({success: false, error: e.message});
    }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const id = parseInt(req.params.id);
    const user = await userRepository.findById(id);

    if (!user) {
      return res.status(400).json({typeError: 'Error', error: errorMessages['users/not-found']});
    }

    await userRepository.delete( { id });
    return res.status(204 ).send();
  } catch (e) {
    res.status(400).json({success: false, error: e.message});
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { skip, take } = req.body as { skip: number, take: number };
    const userRepository = getCustomRepository(UserRepository);
    const data = await userRepository.find({ skip, take });
    return res.status(200 ).json({ success: true, data });
  } catch (e) {
    res.status(400).json({success: false, error: e.message});
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userId = (req as any).user.user.id;
    const role = get(req, 'user.role[0]', '');
    const userRepository = getCustomRepository(UserRepository);
    if (role === RoleStatus.BASIC && !isEqual(id, userId)) {
      return res.status(400).json({ typeError: 'Error', error: errorMessages['users/not-allowed'] });
    }
    const user = await userRepository.findById(id);
    return res.status(200).json({ success: true, data: user });
  } catch (e) {
    res.status(400).json({success: false, error: e.message});
  }
};
