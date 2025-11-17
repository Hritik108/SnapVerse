import prisma from "../config/database.js";
import type { Prisma } from "../generated/prisma/client.js";

interface CreatePostInput {
  imageUrl?: string;
  caption?: string;
  location?: string;
}

export class PostService {

      /**
   * Sanitize and validate post creation input.
   * - Whitelist allowed fields (only imageUrl, caption, location)
   * - Trim whitespace from strings
   * - Validate required fields (imageUrl is required)
   * - Validate max lengths to prevent DB issues
   * @param data - raw client input
   * @returns sanitized object
   */
  private sanitizePostData(data: any): { imageUrl: string; caption?: string; location?: string } {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid post data: expected object');
    }

    // imageUrl is required
    const imageUrl = typeof data.imageUrl === 'string' ? data.imageUrl.trim() : '';
    if (!imageUrl) {
      throw new Error('imageUrl is required');
    }
    if (imageUrl.length > 2048) {
      throw new Error('imageUrl must not exceed 2048 characters');
    }

    // caption is optional but sanitize if provided
    const caption =
      typeof data.caption === 'string'
        ? data.caption.trim().slice(0, 5000) // cap at 5000 chars
        : undefined;

    // location is optional but sanitize if provided
    const location =
      typeof data.location === 'string'
        ? data.location.trim().slice(0, 500) // cap at 500 chars
        : undefined;

    return {
      imageUrl,
      ...(caption && { caption }),
      ...(location && { location }),
    };
  }


  /**
   * Create a new post with sanitized and validated input.
   * @param userId - authenticated user's ID (from JWT/session)
   * @param postData - raw client input (to be sanitized)
   * @returns created Post record
   * @throws Error if validation fails or DB operation fails
   */
  async createPost(userId: string, postData: CreatePostInput) {
    try {
      // Validate userId exists and is a valid UUID
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid user ID');
      }

      // Sanitize and whitelist allowed scalar fields
      const sanitized = this.sanitizePostData(postData);

      // Create the post with the authenticated user as author
      const post = await prisma.post.create({
        data: {
          imageUrl: sanitized.imageUrl,
          caption: sanitized.caption || null,
          location: sanitized.location || null,
          author: { connect: { id: userId } },
        },
      });

      console.log('[PostService] Post created successfully', {
        postId: post.id,
        userId,
        timestamp: new Date().toISOString(),
      });

      return post;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('[PostService] Failed to create post', {
        userId,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      });
      throw err;
    }
  }

  async deletePost(postId: string, userId: string) {
    try {
      // Validate inputs
      if (!postId || typeof postId !== 'string' || postId.trim() === '') {
        throw new Error('Invalid post ID');
      }
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid user ID');
      }

      // Delete the post if it belongs to the user
      const deletedPost = await prisma.post.deleteMany({
        where: {
          id: postId,
          authorId: userId,
        },
      });
      
      if (deletedPost.count === 0) {
        throw new Error('Post not found or user not authorized to delete this post');
      }

      console.log('[PostService] Post deleted successfully', {
        postId,
        userId,
        timestamp: new Date().toISOString(),
      });

      return deletedPost;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('[PostService] Failed to delete post', {
        postId,
        userId,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      });
      throw err;
    }
  }

  async getPostById(postId: string) {
    try {
      // Validate input
      if (!postId || typeof postId !== 'string' || postId.trim() === '') {
        throw new Error('Invalid post ID');
      }

      // Fetch the post by ID
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error('Post not found');
      }

      return post;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('[PostService] Failed to fetch post', {
        postId,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      });
      throw err;
    }
  }

  async updatePost(postId: string, userId: string, updateData: Partial<CreatePostInput>) {
    try {
      // Validate inputs
      if (!postId || typeof postId !== 'string' || postId.trim() === '') {
        throw new Error('Invalid post ID');
      }
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid user ID');
      }

      // Sanitize and whitelist allowed scalar fields
      const sanitized: Partial<CreatePostInput> = {};
      if (updateData.imageUrl !== undefined) {
        const imageUrl = typeof updateData.imageUrl === 'string' ? updateData.imageUrl.trim() : '';
        if (!imageUrl) {
          throw new Error('imageUrl cannot be empty');
        }
        if (imageUrl.length > 2048) {
          throw new Error('imageUrl must not exceed 2048 characters');
        }
        sanitized.imageUrl = imageUrl;
      }
      if (updateData.caption !== undefined) {
        if (typeof updateData.caption !== 'string') {
          throw new Error('caption must be a string');
        }
        sanitized.caption = updateData.caption.trim().slice(0, 5000);
      }
      if (updateData.location !== undefined) {
        if (typeof updateData.location !== 'string') {
          throw new Error('location must be a string');
        }
        sanitized.location = updateData.location.trim().slice(0, 500);
      }

      // Build data object only with defined fields to avoid `string | undefined` issues
      const dataToUpdate: Partial<Record<keyof CreatePostInput, string | null>> = {};
      if (sanitized.imageUrl !== undefined) dataToUpdate.imageUrl = sanitized.imageUrl;
      if (sanitized.caption !== undefined) dataToUpdate.caption = sanitized.caption ?? null;
      if (sanitized.location !== undefined) dataToUpdate.location = sanitized.location ?? null;

      // Update the post if it belongs to the user
      const updatedPost = await prisma.post.updateMany({
        where: {
          id: postId,
          authorId: userId,
        },
        data: dataToUpdate as any,
      });

      if (updatedPost.count === 0) {
        throw new Error('Post not found or user not authorized to update this post');
      }

      console.log('[PostService] Post updated successfully', {
        postId,
        userId,
        timestamp: new Date().toISOString(),
      });

      return updatedPost;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('[PostService] Failed to update post', {
        postId,
        userId,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      });
      throw err;
    }
  }

  async getPostsByUser(userId: string, limit = 10, skip = 0) {
    try {
      // Validate input
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid user ID');
      } 

      const posts = await prisma.post.findMany({
        where:{authorId:userId},
        take:limit,
        skip,
        orderBy: { createdAt: 'desc' },
        // include: { author: { select: { id: true, username: true, profilePicUrl: true } } },
      })

      return posts;

}
catch (error) {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error('[PostService] Failed to fetch posts by user', {
    userId,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
  throw err;
}
}

}