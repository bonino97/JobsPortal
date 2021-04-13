import { Response } from 'express';

/**
 * @param {*} res :: Response object
 * @param {*} msgKey  :: Key Message
 * @param {*} code :: HTTP Status Code
 * @param {*} payload :: Optional arguments
 */

const serverErrorRespMsg = {
    ERROR_OCCURRED: 'We have an unexpected error. Please, ' + 'contant an administrator if this problem persits.'
};

const bookMessages = {
    BOOK_CREATED_SUCCESS: 'Book created Succesfully...'
};

const responseMessages = {
    ...serverErrorRespMsg,
    ...bookMessages
};

const sendResponse = (res: Response, msgKey: string, code: number, payload: any = {}) => {
    console.log(responseMessages);
    const token = payload.hasOwnProperty('token') ? payload.token : undefined;
    const data = payload.hasOwnProperty('data') ? payload.data : undefined;
    return res.status(code).json({
        success: code >= 200 && code < 300,
        // msg: responseMessages[msgKey],
        token,
        data
    });
};

export default sendResponse;
