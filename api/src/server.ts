import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import logging from './config/logging';
import config from './config/config';

/* Routes Import */
import indexRoutes from './routes/index';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';

const NAMESPACE = 'Server';
const app = express();

/* Connect to MongoDB */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => logging.info(NAMESPACE, `DATABASE [Online] => Name: ${config.mongo.dbName}`))
    .catch((error) => logging.error(NAMESPACE, error.message, error));

/* Logging the request */

app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] => URL: [${req.url}] => IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] => URL: [${req.url}] => IP: [${req.socket.remoteAddress}] => STATUS: [${res.statusCode}]`);
    });

    next();
});

/* Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Rules of our API */
app.use(cors());

/* Routes */
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

/* Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/* Create the server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `API [Online] => Running on: ${config.server.hostname}:${config.server.port}`));
