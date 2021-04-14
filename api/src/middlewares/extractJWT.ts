import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import logging from '../config/logging';

const NAMESPACE = 'Middleware';
const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `ExtractJWT Method`);
    let token = req.headers.authorization?.split(' ')[1];
    return;
};
