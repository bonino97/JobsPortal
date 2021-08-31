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

import sendMail from '../helpers/email';
import { registerEmailTemplate } from '../handlers/registerEmailTemplate';

const NAMESPACE = 'Auth Controller';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'ValidateToken Method - Validate JWT');
    return sendResponse(res, 'AUTHORIZED', 200);
};

const register = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Register Method`);
    let { email, password, firstName, lastName } = req.body;
    bcrypt.hash(password, 10, async (error: Error, hash: any) => {
        if (error) sendResponse(res, 'HASH_ERROR', 500, { data: error });

        const userExists = await User.findOne({ email });
        if (userExists) return sendResponse(res, 'USER_EXISTS', 401, { data: error });

        const user = new User({
            email,
            password: hash,
            firstName,
            lastName,
            isActive: false
        });
        sendMail(registerEmailTemplate(user));

        return user
            .save()
            .then((user: IUser) => sendResponse(res, 'REGISTER_SUCCESS', 201, { data: user }))
            .catch((error: Error) => sendResponse(res, 'REGISTER_ERROR', 500, { data: error }));
    });
};

const login = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Login Method');
    let { email, password } = req.body;
    User.findOne({ email })
        .exec()
        .then((user: any) => {
            if (!user) return sendResponse(res, 'UNEXISTENT_USER', 401);
            if (!user.isActive) return sendResponse(res, 'INACTIVE_USER', 401);
            bcrypt.compare(password, user.password, (error: Error, result: any) => {
                if (error) return sendResponse(res, 'LOGIN_ERROR', 401, { data: error });
                if (result) {
                    signJWT(user, (error, token) => {
                        if (error) return sendResponse(res, 'SIGN_TOKEN_ERROR ', 401, { data: error });
                        if (token) return sendResponse(res, 'LOGIN_SUCCESS', 200, { data: token, user });
                    });
                } else return sendResponse(res, 'INCORRECT_PASSWORD', 401, { data: error });
            });
        })
        .catch((error: Error) => sendResponse(res, 'SIGN_TOKEN_ERROR', 500, { data: error }));
};

const confirmAccount = async (req: Request, res: Response) => {
    try {
        logging.info(NAMESPACE, 'Activate User Method');
        const { id, password } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) return sendResponse(res, 'UNEXISTENT_USER', 401);
        if (!bcrypt.compareSync(password, user.password)) return sendResponse(res, 'INCORRECT_PASSWORD', 401);
        user.isActive = true;
        user.save();
        return sendResponse(res, 'USER_ACTIVED_SUCCESS', 200);
    } catch (error: any) {
        return sendResponse(res, 'USER_ACTIVED_ERROR', 500, { data: error });
    }
};

const forgotPassword = async (req: Request, res: Response) => {};

const resetPassword = async (req: Request, res: Response) => {};

export default { validateToken, register, login, forgotPassword, resetPassword, confirmAccount };
