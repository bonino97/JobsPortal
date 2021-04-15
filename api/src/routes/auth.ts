import express from 'express';

/* Internal */
import authController from '../controllers/auth';
import extractJWT from '../middlewares/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, authController.validateToken);
router.post('/register', authController.register);
router.post('/login', authController.login);

export = router;
