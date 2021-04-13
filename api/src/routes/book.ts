import express from 'express';
import bookController from '../controllers/book';

const router = express.Router();

router.get('/all', bookController.getAllBooks);

router.post('/', bookController.createBook);

export = router;
