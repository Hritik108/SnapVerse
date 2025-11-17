import { PostService } from "../services/post.service.js";
import { Router } from "express";

const router = Router();
const postService = new PostService();

router.post('/', async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const postData = req.body;
    const newPost = await postService.createPost(userId, postData);
    return res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    next(err);
  }
});

router.put('/:postId', async (req, res, next) => {
    try{
        const postId = req.params.postId;
        const userId = req.user?.userId;
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
        const updateData = req.body;
        const updatedPost = await postService.updatePost(postId, userId, updateData);
        return res.status(200).json({ message: 'Post updated successfully', post: updatedPost });

    }
    catch(err){
        next(err);
    }});

   router.delete('/:postId', async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const deletedPost = await postService.deletePost(postId, userId);
      return res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (err) {
      next(err);
    }
  });

router.get('/:postId', async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const post = await postService.getPostById(postId);
      return res.status(200).json({ message: 'Post fetched successfully', post });
    } catch (err) {
      next(err);
    }            

});