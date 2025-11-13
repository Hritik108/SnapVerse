import { Router } from "express";   
import {UserController} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();
const userController = new UserController();

router.get('/profile/:id', authenticate, userController.getUserProfile); // Optional id param
router.put('/profile', authenticate, userController.updateUserProfile);
router.get('/search', authenticate, userController.searchUsers);
router.post('/follow/:id', authenticate, userController.followUser);
router.post('/unfollow/:id', authenticate, userController.unfollowUser);
export default router;