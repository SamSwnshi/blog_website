import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateJWT = (user) => jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
