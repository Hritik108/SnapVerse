import prisma from "../config/database.js";

export class CommentService {

  /**
   * Delete a comment by its ID.
   * @param commentId - ID of the comment to delete
   * @returns deleted Comment record
   * @throws Error if comment not found or DB operation fails
   */
  async deleteComment(commentId: string) {
    try {
      const deletedComment = await prisma.comment.delete({
        where: { id: commentId },
      });
      return deletedComment;
    } catch (error) {
      throw new Error(`Failed to delete comment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async createComment(userId: string, postId: string, content: string) {
    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          author: { connect: { id: userId } },
          post: { connect: { id: postId } },
        },
      });
      return comment;
    } catch (error) {
      throw new Error(`Failed to create comment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Reply to an existing comment.
   * Ensures the parent comment exists and belongs to the same post.
   */
  async replyToComment(userId: string, postId: string, parentCommentId: string, content: string) {
    try {
      // Basic validation / sanitization
      if (!content || typeof content !== 'string' || content.trim() === '') {
        throw new Error('Reply content is required');
      }
      const cleanContent = content.trim().slice(0, 2000); // cap length

      // Ensure parent comment exists and belongs to the same post
      const parent = await prisma.comment.findUnique({ where: { id: parentCommentId } });
      if (!parent) {
        throw new Error('Parent comment not found');
      }
      if (parent.postId !== postId) {
        throw new Error('Parent comment does not belong to this post');
      }

      // Create the reply and connect it to parent comment
      const reply = await prisma.comment.create({
        data: {
          content: cleanContent,
          author: { connect: { id: userId } },
          post: { connect: { id: postId } },
          parent: { connect: { id: parentCommentId } },
        },
      });

      return reply;
    } catch (error) {
      throw new Error(`Failed to create reply: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get direct child replies for a comment. Optionally fetch nested replies up to `depth` levels.
   * @param commentId - parent comment id
   * @param depth - nesting depth (1 = direct children only)
   */
  async getReplies(commentId: string, depth = 1) {
    try {
      if (!commentId || typeof commentId !== 'string' || commentId.trim() === '') {
        throw new Error('Invalid comment ID');
      }

      const fetchReplies = async (parentId: string, level: number): Promise<any[]> => {
        const children = await prisma.comment.findMany({
          where: { parentId },
          include: { author: { select: { id: true, username: true, profilePicUrl: true } } },
          orderBy: { createdAt: 'asc' },
        });

        if (level >= depth) return children;

        // recursively fetch nested replies
        const withNested = await Promise.all(children.map(async (c): Promise<any> => {
          const nested: any[] = await fetchReplies(c.id, level + 1);
          return { ...c, replies: nested };
        }));

        return withNested;
      };

      return await fetchReplies(commentId, 1);
    } catch (error) {
      throw new Error(`Failed to fetch replies: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async getCommentsByPost(postId: string) {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      });
      return comments;
    } catch (error) {
      throw new Error(`Failed to fetch comments: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async updateComment(commentId: string, userId: string, content: string) {
    try {
      const updatedComment = await prisma.comment.updateMany({
        where: {
          id: commentId,
          authorId: userId,
        },
        data: { content },
      });

      if (updatedComment.count === 0) {
        throw new Error('Comment not found or user not authorized to update this comment');
      }

      return updatedComment;
    } catch (error) {
      throw new Error(`Failed to update comment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  


}
  