import { Router } from "express";   
import {UserController} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();
const userController = new UserController();
router.use(authenticate);
router.get('/profile/:id', userController.getUserProfile); // Optional id param
router.put('/profile', userController.updateUserProfile);
router.get('/search',  userController.searchUsers);
router.post('/follow/:id', userController.followUser);
router.post('/unfollow/:id', userController.unfollowUser);
export default router;