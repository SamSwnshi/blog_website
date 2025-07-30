import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.models.js';
dotenv.config();

export const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(401).json({ message: 'Unauthorized: User not found' });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next()
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
}