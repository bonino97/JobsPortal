import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'User Controller';

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `GetUsers Method`);
};

export default { getUsers };
