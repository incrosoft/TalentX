import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const me = async (req: any, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                full_name: true,
                role: true,
                avatar_url: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Agency login controller
 * -----------------------
 * Accepts email and password. Validates credentials against the users table.
 * Enforces that the user role is `agency`. If valid, returns a signed JWT
 * with user id, email, and role as the payload.
 *
 * Expected body:
 * {
 *   "email": "agency@example.com",
 *   "password": "plainTextPassword"
 **/

export const loginAgency = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email?: string; password?: string }; 
    // Basic input validation

    if (!email || !password) {
        return res.status(400).json({message:'Email and Password are required'});
    }

    try {
        // Find user by email

        const user = await prisma.user.findUnique({
            where: {email},
            select: {id:true, email:true, password_hash:true, role:true}
        });

        // Block login attempts for non agency users
        if (!user || user.role !== 'agency') {
            return res.status(401).json({message:'Invalid credentials'});
        }
        // Compare provided password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch){
            return res.status(401).json({message:'Invalid credentials'});
        }

        // Sign JWT with minimal claims. Avoid embedding sensitive data.
        const token = jwt.sign(
            {id: user.id, email:user.email, role:user.role},
            JWT_SECRET,
            {expiresIn: '78h'}
        );

        // Return token and minimal user profile for client-side usage
        return res.json({
            token, user: { id:user.id, email:user.email, role:user.role},
        });
    } catch (error){
        // Log error server-side 
        return res.status(500).json({message:'Internal server error'});
    }
};