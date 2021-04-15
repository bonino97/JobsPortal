/* External */
import { Request, Response, NextFunction } from 'express';

/* Internal */
import logging from '../config/logging';

/* Models */
import User from '../models/user';
import IUser from '../interfaces/user';
import sendResponse from '../handlers/handleResponses';

const NAMESPACE = 'User Controller';

const getUsers = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetUsers Method');
    User.find()
        .select('-password')
        .exec()
        .then((users: IUser[]) => sendResponse(res, 'GET_USERS', 200, { data: { users, count: users.length } }))
        .catch((error: Error) => sendResponse(res, 'GET_USERS_ERROR', 500));
};

export default { getUsers };
