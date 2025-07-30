import Post from '../models/post.models.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const deleteAnyPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted by admin' });
  } catch (error) {
    next(error);
  }
};
