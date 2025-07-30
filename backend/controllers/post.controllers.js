import Post from "../models/post.models.js";
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email avatar")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            "author",
            "name email avatar"
        );
        if (!post) return res.status(404).json({ message: "Post not found" });

        const likedByCurrentUser = req.user
            ? post.likes.some((id) => id.toString() === req.user._id.toString())
            : false;

        res.json({ ...post.toObject(), likedByCurrentUser });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};

export const createPost = async (req, res) => {
    console.log("From create post", req.body)
    try {
        const { title, content, tags, image } = req.body;
        if (!title || !content)
            return res.status(400).json({ message: "Title and content required" });

        const post = new Post({
            title,
            content,
            image: image || null,
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((s) => s.trim()) : []),
            author: req.user._id,
            likes: [],
            comments: []
        });

        await post.save();
        
        // Convert author to string for response
        const postResponse = post.toObject();
        postResponse.author = postResponse.author.toString();
        
        res.status(201).json(postResponse);
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (
            req.user._id.toString() !== post.author.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const { title, content, tags } = req.body;
        if (title) post.title = title;
        if (content) post.content = content;
        if (tags) post.tags = Array.isArray(tags) ? tags : tags.split(",").map((s) => s.trim());

        if (req.file?.path) post.image = req.file.path;

        await post.save();

        // Convert author to string for response
        const postResponse = post.toObject();
        postResponse.author = postResponse.author.toString();

        res.json(postResponse);
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (
            req.user._id.toString() !== post.author.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const userId = req.user._id.toString();

        const likedIndex = post.likes.findIndex(id => id.toString() === userId);

        if (likedIndex === -1) {
            post.likes.push(req.user._id);
        } else {
            post.likes.splice(likedIndex, 1);
        }

        await post.save();

        res.json({
            message: likedIndex === -1 ? "Post liked" : "Post unliked",
            totalLikes: post.likes.length,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};
