import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
/* Logging */
import logging from '../config/logging';
import Book from '../models/book';
/* Models */

const NAMESPACE = 'Book Controller';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `FUNCTION: createBook.`);
    let { author, title } = req.body;
    const book = new Book({
        title,
        author
    });

    return book
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `FUNCTION: getAllBooks.`);
    Book.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                books: results,
                count: results.length
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default {
    getAllBooks,
    createBook
};
