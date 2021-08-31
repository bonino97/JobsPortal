import express from 'express';

/* Internal */
import authController from '../controllers/auth';
import extractJWT from '../middlewares/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, authController.validateToken);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/confirm-account', authController.confirmAccount);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export = router;
