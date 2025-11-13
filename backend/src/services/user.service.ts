import prisma from "../config/database.js"

export class UserService {

    //Get a user profile by id
    async getUserProfileById (userId: string) {
        // Logic to get user profile by ID
        const userProfile = prisma.user.findUnique({
            where: {id: userId},
            select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            bio: true,
            profilePicUrl: true,
            isVerified: true,
            isPrivate: true,
            createdAt: true,
            followers:{ select: { followerId: true } },
            following:{ select: { followingId: true } },
            }
        })

        return userProfile;
    }

    //update user profile
    async updateUserProfile (userId: string, updateData: any) {
        // Logic to update user profile
        const updatedUser = prisma.user.update({
            where: {id: userId},
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                bio: true,
                profilePicUrl: true,
                isVerified: true,
                isPrivate: true,
                createdAt: true,
            }
        });
        return updatedUser;
    }

    // search users by username or full name
    async searchUsers (query: string, limit: number = 10,skip: number = 0) {
        // Logic to search users
        const users = prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: 'insensitive' } },
                    { fullName: { contains: query, mode: 'insensitive' } },
                ],
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                profilePicUrl: true,
            },
            take: limit, // limit results
            skip: skip, // pagination
        });
        return users;
    }

    // Follow a user

    async followUser (followerId: string, followingId: string) {

        if (followerId === followingId) {
            throw new Error("Users cannot follow themselves");
        }

        const existingFollow = await prisma.follow.findUnique({
            where:{
                followerId_followingId: {
                    followerId,
                    followingId,
                }
            }
        });

        if (existingFollow) {
            throw new Error("Already following this user");
        }

        // Logic to follow a user
        const follow = await prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
        });
        return follow;
    }

    async unfollowUser (followerId: string, followingId: string) {

        if (followerId === followingId) {
            throw new Error("Users cannot unfollow themselves");
        }

        const existingFollow = await prisma.follow.findUnique({
            where:{
                followerId_followingId: {
                    followerId,
                    followingId,
                }
            }
        });

        if (!existingFollow) {
            throw new Error("You are not following this user");
        }
        
        // Logic to unfollow a user
        const unfollow = await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                }
            }
        })

        return unfollow;
    }

    //  Get list of followers for a user
    
    async getFollowers (userId: string, limit: number = 10, skip: number = 0) {
        // Logic to get followers
        const followers = await prisma.follow.findMany({
            where: { followingId: userId },
            select: {
                follower: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicUrl: true,
                    }
                }
            },
            take: limit,
            skip: skip,
        });
        return followers.map(f => f.follower);
    }

    // Get list of users a user is following
    async getFollowing (userId: string, limit: number = 10, skip: number = 0) {
        // Logic to get following
        const following  = await  prisma.follow.findMany({
            where : { followerId: userId },
            select: {
                following: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicUrl: true,
                    }
                }
            },
            take: limit,
            skip: skip,
        });
        return following.map(f => f.following);
    }

}