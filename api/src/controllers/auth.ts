/* External */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
/* Internal */
import logging from '../config/logging';
import sendResponse from '../handlers/handleResponses';
import signJWT from '../functions/signJWT';
/* Models */
import User from '../models/user';
import IUser from '../interfaces/user';

const NAMESPACE = 'Auth Controller';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'ValidateToken Method - Validate JWT');
    return sendResponse(res, 'AUTHORIZED', 200);
};

const register = (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Register Method`);
    let { email, password } = req.body;
    bcrypt.hash(password, 10, (error: Error, hash: any) => {
        if (error) sendResponse(res, 'HASH_ERROR', 500, { data: error });

        const user = new User({
            email,
            password: hash
        });

        return user
            .save()
            .then((user: IUser) => sendResponse(res, 'REGISTER_SUCCESS', 201, { data: user }))
            .catch((error: Error) => sendResponse(res, 'REGISTER_ERROR', 500, { data: error }));
    });
};

const login = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Login Method');
    let { email, password } = req.body;
    User.findOne({ email })
        .exec()
        .then((user: any) => {
            if (!user) sendResponse(res, 'UNEXISTENT_USER', 401);
            bcrypt.compare(password, user.password, (error: Error, result: any) => {
                if (error) sendResponse(res, 'LOGIN_ERROR', 401, { data: error });
                if (result) {
                    signJWT(user, (error, token) => {
                        if (error) sendResponse(res, 'SIGN_TOKEN_ERROR ', 401, { data: error });
                        if (token) sendResponse(res, 'LOGIN_SUCCESS', 200, { data: token, user });
                    });
                } else sendResponse(res, 'INCORRECT_PASSWORD', 401, { data: error });
            });
        })
        .catch((error: Error) => sendResponse(res, 'SIGN_TOKEN_ERROR', 500, { data: error }));
};

export default { validateToken, register, login };
