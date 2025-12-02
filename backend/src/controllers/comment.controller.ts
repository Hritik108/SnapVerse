import { CommentService } from "../services/comment.services.js";

export class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

    createComment = async (req: any, res: any, next: any) => {
        try {
            const userId = req.user?.userId;
            const { postId, content } = req.body;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const newComment = await this.commentService.createComment(userId, postId, content);
            return res.status(201).json({ message: 'Comment created successfully', comment: newComment });
        } catch (err) {
            next(err);
        }
    }

    replyToComment = async (req: any, res: any, next: any) => {
        try {
            const userId = req.user?.userId;
            const { postId, parentCommentId, content } = req.body;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const replyComment = await this.commentService.replyToComment(userId, postId, parentCommentId, content);
            return res.status(201).json({ message: 'Reply created successfully', comment: replyComment });
        } catch (err) {
            next(err);
        }
    }

    deleteComment = async (req: any, res: any, next: any) => {
        try {
            const commentId = req.params.commentId;

            const deletedComment = await this.commentService.deleteComment(commentId);
            return res.status(200).json({ message: 'Comment deleted successfully', comment: deletedComment });
        } catch (err) {
            next(err);
        }
    }
};