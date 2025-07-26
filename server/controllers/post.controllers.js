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
            ? post.likedBy.some((id) => id.toString() === req.user._id.toString())
            : false;

        res.json({ ...post.toObject(), likedByCurrentUser });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content)
            return res.status(400).json({ message: "Title and content required" });

        const image = req.file?.path || null;
        const post = new Post({
            title,
            content,
            image,
            tags: tags ? tags.split(",").map((s) => s.trim()) : [],
            author: req.user._id,
        });

        await post.save();
        res.status(201).json(post);
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
        if (tags) post.tags = tags.split(",").map((s) => s.trim());

        if (req.file?.path) post.image = req.file.path;

        await post.save();

        res.json(post);
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

        const likedIndex = post.likedBy.findIndex(id => id.toString() === userId);

        if (likedIndex === -1) {
            post.likedBy.push(req.user._id);
        } else {
            post.likedBy.splice(likedIndex, 1);
        }

        await post.save();

        res.json({
            likedByCurrentUser: likedIndex === -1,
            likesCount: post.likedBy.length,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, error: true });
    }
};
