// Auth routes
import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';
import { checkDuplicateUsernameOrEmail } from '../middlewares/index.js';

const router = Router();

router.post('/register', [
  validateRegister,
  checkDuplicateUsernameOrEmail
], register);

router.post('/login', validateLogin, login);

router.post('/logout', logout);

export default router;