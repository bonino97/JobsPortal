/* External */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
/* Internal */
import config from '../config/config';
import logging from '../config/logging';
import sendResponse from '../handlers/handleResponses';

const NAMESPACE = 'Middleware';
const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `ExtractJWT Method`);
    let token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decode) => {
            if (error) {
                return sendResponse(error, 'VERIFY_JWT_ERROR', 401, { data: error.message });
            } else {
                res.locals.jwt = decode;
                next();
            }
        });
    } else {
        return sendResponse(res, 'UNAUTHORIZED', 401);
    }
};

export default extractJWT;
