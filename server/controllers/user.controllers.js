import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generateJWT.js";

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

    return res.json({ token, user });
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

    return res.status(201).json({
      message: "User registered successfully",
      data: savedUser,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
export const getProfile = (req, res) => {
  res.json(req.user);
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
