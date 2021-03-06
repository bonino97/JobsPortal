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
import { registerEmailTemplate } from '../helpers/registerEmailTemplate';

import { v4 as uuid } from 'uuid';
import { resetPasswordEmailTemplate } from '../helpers/resetPasswordEmailTemplate';

const NAMESPACE = 'Auth Controller';
const SALT_ROUNDS = 10;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'ValidateToken Method - Validate JWT');
    return sendResponse(res, 'AUTHORIZED', 200);
};

const register = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Register Method`);
    let { email, password, firstName, lastName } = req.body;
    bcrypt.hash(password, SALT_ROUNDS, async (error: Error, hash: any) => {
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
        await sendMail(registerEmailTemplate(user));

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

const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        if (!user) return sendResponse(res, 'UNEXISTENT_USER', 401);
        user.token = uuid();
        user.expires = Date.now() + 3600000;
        await user.save();
        await sendMail(resetPasswordEmailTemplate(user));

        return sendResponse(res, 'FORGOT_PASSWORD_SUCCESS', 200);
    } catch (error: any) {
        return sendResponse(res, 'FORGOT_PASSWORD_ERROR', 500, { data: error });
    }
};

const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;
        const user = await User.findOne({ token });
        console.log(req.body);
        if (!user) return sendResponse(res, 'RESET_PASSWORD_EXPIRED', 401);
        if (user.expires && user.expires < Date.now()) return sendResponse(res, 'RESET_PASSWORD_EXPIRED', 401);

        user.password = await bcrypt.hash(password, SALT_ROUNDS);
        user.token = '';
        user.expires = 0;

        await user.save();

        return sendResponse(res, 'RESET_PASSWORD_SUCCESS', 200);
    } catch (error: any) {
        return sendResponse(res, 'RESET_PASSWORD_ERROR', 500, { data: error });
    }
};

export default { validateToken, register, login, forgotPassword, resetPassword, confirmAccount };
