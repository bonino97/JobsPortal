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

const NAMESPACE = 'Auth Controller';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'ValidateToken Method - Validate JWT');
    return sendResponse(res, 'AUTHORIZED', 200);
};

const register = (req: Request, res: Response) => {
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
            active: false
        });

        sendMail({
            user,
            subject: 'Reset Password',
            html: `
            <table style="background-color: #f6f7fb; width: 100%">
            <tbody>
              <tr>
                <td>
                  <table style="width: 650px; margin: 0 auto; margin-bottom: 30px">
                    <tbody>
                      <tr>
                        <td><img src="../assets/images/cuba-logo1.png" alt=""></td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="width: 650px; margin: 0 auto; background-color: #fff; border-radius: 8px">
                    <tbody>
                      <tr>
                        <td style="padding: 30px">
                        <h1 style="
                        font-family: Poppins, sans-serif;
                        color: #7366ff;
                        font-weight: bolder;
                        "> 
                        Recruiter Works!
                        </h1> 
                          <p style="font-family: Poppins, sans-serif;">Hi There,</p>
                          <p style="font-family: Poppins, sans-serif;">Thank you very much for joining us!</p>
                          <div class="text-center"><a href="#" style="padding: 10px; background-color: #7366ff; color: #fff; display: inline-block; border-radius: 4px; margin-bottom: 18px; font-family: Poppins, sans-serif;">CONFIRM ACCOUNT</a></div>
                          <p style="font-family: Poppins, sans-serif;">Please click Confirm Account. To validate your account.</p>
                          <p style="margin-bottom: 0; font-family: Poppins, sans-serif;">Good luck!</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="width: 650px; margin: 0 auto; margin-top: 30px">
                    <tbody>       
                      <tr style="text-align: center">
                        <td> 
                          <p style="color: #999; margin-bottom: 0; font-family: Poppins, sans-serif;">Powered By Recruiter Works!</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
                `
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

const forgotPassword = async (req: Request, res: Response) => {};

const resetPassword = async (req: Request, res: Response) => {};

export default { validateToken, register, login, forgotPassword, resetPassword };
