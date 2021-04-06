import { Router } from 'express';
import { createUserValidator, criteriaUsersValidator } from './user.validator';
import {createUser, deleteUser, getUser, getUsers} from './user.controller';
import {authorize, permissions, roleAuthorized} from "../shared";
import {RoleStatus} from "../role/constants";

export const usersRouter = Router();

usersRouter.post('/', createUserValidator, authorize(permissions.USER__W), createUser);

usersRouter.delete('/:id', authorize(permissions.USER__D), deleteUser);

usersRouter.post('/query', criteriaUsersValidator, roleAuthorized(RoleStatus.ADMIN), getUsers);

usersRouter.get('/:id', authorize(permissions.USER__R), getUser);
