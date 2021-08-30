import nodemailer from 'nodemailer';
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = 'Email Helper';

const transport = nodemailer.createTransport({
    host: config.email.host,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    },
    logger: true
});

const sendMail = async (options: any) => {
    try {
        const emailOptions = {
            from: 'PortalJobs <noreply@PortalJobs.com>',
            to: options.user.email,
            subject: options.subject,
            html: options.html
        };

        const sendMail = await transport.sendMail(emailOptions);
        return sendMail;
    } catch (error: any) {
        return logging.error(NAMESPACE, 'Login Method', error);
    }
};

export default sendMail;
