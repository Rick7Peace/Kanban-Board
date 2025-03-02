import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }
        // Check if the password is correct
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed: Invalid password' });
        }
        // Ensure the JWT secret key exists
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ message: 'Server error: JWT secret key not defined' });
        }
        // Generate a JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        // Send the token to the client
        return res.json({ token });
    }
    catch (error) {
        // Catch any unexpected errors
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        return res.status(500).json({ message: `Internal server error: ${errorMessage}` });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
