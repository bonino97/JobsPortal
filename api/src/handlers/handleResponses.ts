const serverErrorRespMsg = {
    ERROR_OCCURRED: 'We have an unexpected error. Please, ' + 'contant an administrator if this problem persits.'
};

const bookMessages = {
    BOOK_CREATED_SUCCESS: 'Book created Succesfully...'
};

const authMessages = {
    AUTHORIZED: 'Authorized.',
    HASH_ERROR: 'An error ocurred saving password.'
};

const userMessages = {};

const responseMessages: any = {
    ...serverErrorRespMsg,
    ...bookMessages,
    ...authMessages,
    ...userMessages
};

const sendResponse = (res: any, msgKey: any, code: number, payload: any = {}) => {
    const data = payload.hasOwnProperty('data') ? payload.data : undefined;
    return res.status(code).json({
        success: code >= 200 && code < 300,
        msg: responseMessages[msgKey],
        data
    });
};

export default sendResponse;
