import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import logging from '../config/logging';
import sendResponse from '../handlers/handleResponses';

const NAMESPACE = 'Auth Controller';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `ValidateToken Method - Validate JWT`);
    return sendResponse(res, 'AUTHORIZED', 200);
};

const register = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Register Method`);
    let { username, password } = req.body;
    bcrypt.hash(password, 10, (error: Error, hash: any) => {
        if (error) {
            return sendResponse(error, 'HASH_ERROR', 500, { data: error.message });
        }
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Login Method`);
};

export default { validateToken, register, login };
