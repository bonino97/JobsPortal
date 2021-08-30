const serverErrorRespMsg = {
    ERROR_OCCURRED: 'We have an unexpected error. Please, ' + 'contant an administrator if this problem persits.'
};

const authMessages = {
    AUTHORIZED: 'Authorized.',
    UNAUTHORIZED: 'Unauthorized.',
    HASH_ERROR: 'An error ocurred saving password...',
    VERIFY_JWT_ERROR: 'An error ocurred verifying Token...',
    REGISTER_SUCCESS: 'User registered successfully...',
    REGISTER_ERROR: 'An error ocurred creating user...',
    USER_EXISTS: 'User with this email already exists...',
    LOGIN_SUCCESS: 'User authenticated successfully...',
    LOGIN_ERROR: 'An error ocurred authenticating user...',
    SIGN_TOKEN_ERROR: 'Unable to sign token.',
    INCORRECT_PASSWORD: 'Incorrect password...',
    UNEXISTENT_USER: 'User not found...',
    FORGOT_PASSWORD_SUCCESS: 'If your email exists, you will receive a password recovery link in few seconds.',
    FORGOT_PASSWORD_ERROR: 'An error occurred resetting password...'
};

const userMessages = { GET_USERS: 'Users loaded Succesfully...', GET_USERS_ERROR: 'An error ocurred loading users...' };

const responseMessages: any = {
    ...serverErrorRespMsg,
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
