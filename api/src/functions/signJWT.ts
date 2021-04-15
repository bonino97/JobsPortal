/* External */
import jwt from 'jsonwebtoken';
/* Internal */
import config from '../config/config';
import logging from '../config/logging';
/* Interfaces */
import IUser from '../interfaces/user';

const NAMESPACE = 'Functions';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try {
        jwt.sign(
            {
                email: user.email
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;
