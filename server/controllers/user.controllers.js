import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generateJWT.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !user.password)
            return res.status(400).json({ message: "Invalid credentials" });

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Check your password",
            });
        }

        const token = generateJWT(user);

        res.json({ token })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,

        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "provide email, name, password",
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.json({
                message: "Already register email",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ name, email, password: hashPassword, avatar: avatar || null, role: "user" });

        const save = await newUser.save();

        const token = generateJWT(user)

        return res.status(201).json({
            message: "User register successfully",
            data: save,
            token,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message, error: true, success: false });
    }
};
