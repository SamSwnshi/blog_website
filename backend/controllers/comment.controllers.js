import Comment from '../models/comment.models.js'
import Post from '../models/post.models.js'

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name avatar')
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
   return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text is required' });

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      post: post._id,
      author: req.user._id,
      text,
    });
    await comment.save();

    // Add comment to post's comments array
    post.comments.push(comment._id);
    await post.save();

    // Convert to object and convert ObjectIds to strings
    const commentResponse = comment.toObject();
    commentResponse.author = commentResponse.author.toString();
    commentResponse.post = commentResponse.post.toString();

    res.status(201).json(commentResponse);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (
      req.user._id.toString() !== comment.author.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Remove comment from post's comments array
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id }
    });

    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
