import express from 'express';

import authController from '../controllers/auth';

const router = express.Router();

router.get('/validate', authController.validateToken);
router.post('/register', authController.register);
router.post('/login', authController.login);

export = router;
