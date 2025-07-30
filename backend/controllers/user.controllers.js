import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generateJWT.js";
import Post from "../models/post.models.js";

export const login = async (req, res) => {
  console.log("req.body is login:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateJWT(user);

    // Convert user to object and add 'id' field
    const userResponse = user.toObject();
    userResponse.id = userResponse._id;

    return res.json({ token, user: userResponse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};

export const register = async (req, res) => {
  console.log("req.body is:", req.body);
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatar || null,
      role: "user",
    });

    const savedUser = await newUser.save();

    const token = generateJWT(savedUser);

    // Convert user to object and add 'id' field
    const userResponse = savedUser.toObject();
    userResponse.id = userResponse._id;

    return res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
export const getProfile = async (req, res) => {
  try {
    const postCount = await Post.countDocuments({ author: req.user._id });
    const userWithPostCount = { ...req.user.toObject(), postCount };
    userWithPostCount.id = userWithPostCount._id;
    res.json(userWithPostCount);
  } catch (error) {
    res.status(500).json({ message: error.message || error, error: true });
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Avatar image is required" });
    }

    req.user.avatar = req.file.path;
    await req.user.save();
    res.json({ avatar: req.user.avatar });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const postCount = await Post.countDocuments({ author: user._id });
    const userWithPostCount = { ...user.toObject(), postCount };
    userWithPostCount.id = userWithPostCount._id;
    
    res.json(userWithPostCount);
  } catch (error) {
    res.status(500).json({ message: error.message || error, error: true });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    if (name) req.user.name = name;
    if (email) req.user.email = email;
    if (avatar) req.user.avatar = avatar;
    await req.user.save();
    
    const postCount = await Post.countDocuments({ author: req.user._id });
    const userWithPostCount = { ...req.user.toObject(), postCount };
    userWithPostCount.id = userWithPostCount._id;
    
    res.json(userWithPostCount);
  } catch (error) {
    res.status(500).json({ message: error.message || error, error: true });
  }
};

export const getOwnPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message || error, error: true });
  }
};


export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: 'idToken is required' });

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      user = new User({
        name: name || 'Google User',
        email,
        avatar: picture || null,
        firebaseUID: uid,
        role: 'user',
      });
      await user.save();
    }

    const token = generateJWT(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};