import { UserService } from "../services/user.service.js";

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    getUserProfile = async (req: any, res: any, next: any) => {
        try {
            const userId = req.params.id || req.user?.userId; // Use param or authenticated user
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
                    }

            const userProfile = await this.userService.getUserProfileById(userId);
            if (!userProfile) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User profile fetched successfully", userProfile });
        } catch (err) {
            next(err);
        }
    }

    updateUserProfile = async (req: any, res: any, next: any) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const updateData = req.body;
            const updatedProfile = await this.userService.updateUserProfile(userId, updateData);
            return res.status(200).json({ message: "User profile updated successfully", updatedProfile });
        } catch (err) {
            next(err);
        }
    }

    searchUsers = async (req: any, res: any, next: any) => {
        try {
            const query = req.query.q;
            const limit = parseInt(req.query.limit) || 10;
            const skip = parseInt(req.query.skip) || 0;

            if (!query) {
                return res.status(400).json({ error: 'Search query is required' });
            }

            const users = await this.userService.searchUsers(query, limit, skip);
            return res.status(200).json({ message: "Users fetched successfully", users });
        } catch (err) {
            next(err);
        }
    }

    followUser = async (req: any, res: any, next: any) => {
        try {
            const followerId = req.user?.userId;
            const followingId = req.params.id;

            if (!followerId || !followingId) {
                return res.status(400).json({ error: 'Follower ID and Following ID are required' });
            }

            const follow = await this.userService.followUser(followerId, followingId);
            return res.status(200).json({ message: "User followed successfully", follow });
        } catch (err) {
            next(err);
        }
    }

    unfollowUser = async (req: any, res: any, next: any) => {
        try {
            const followerId = req.user?.userId;
            const followingId = req.params.id;

            if (!followerId || !followingId) {
                return res.status(400).json({ error: 'Follower ID and Following ID are required' });
            }

            const unfollow = await this.userService.unfollowUser(followerId, followingId);
            return res.status(200).json({ message: "User unfollowed successfully", unfollow });
        } catch (err) {
            next(err);
        }
    }

    getFollowers = async (req: any, res: any, next: any) => {
        try {
            const userId = req.params.id || req.user?.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const followers = await this.userService.getFollowers(userId);
            return res.status(200).json({ message: "Followers fetched successfully", followers });
        } catch (err) {
            next(err);
        }
    }

    getFollowing = async (req: any, res: any, next: any) => {
        try {
            const userId = req.params.id || req.user?.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const following = await this.userService.getFollowing(userId);
            return res.status(200).json({ message: "Following fetched successfully", following });
        } catch (err) {
            next(err);
        }
    }
  // User controller methods
}