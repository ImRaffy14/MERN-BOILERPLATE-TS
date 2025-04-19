import { Router } from 'express';
import { 
    registerUser, 
    loginUser,
    getUserProfile, 
    logoutUser 
} from './../controllers/authController';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getUserProfile);
router.post('/logout', logoutUser);

export default router;