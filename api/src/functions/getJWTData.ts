/* External */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
/* Internal */
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = 'Functions';
const getJWTData = (req: Request) => {
    logging.info(NAMESPACE, `Get JWT Data `);
    let token = req.headers?.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decode) => {
            if (error) {
                return '';
            } else {
                return decode;
            }
        });
    } else {
        return '';
    }
};

export default getJWTData;
