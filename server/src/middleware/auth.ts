import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Read JWT secret from environment variables. Never hardcode secrets in production. 
// Ensure `JWT_SECRET` is set in your deployment environment.
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export const authenticateToken = (
    req: AuthRequest, 
    res: Response, 
    next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

/**
 * authorizeAgency
 * ---------------
 * Role-based authorization guard.
 * Ensures the authenticated user has the `agency` role.
 * If not, returns 403 Forbidden.
 */
export const authorizeAgency = ( 
    req: AuthRequest, 
    res: Response, 
    next: NextFunction ) => { if (req.user?.role !== 'agency') { 
        return res.status(403).json({ message: 'Access denied: Agency only' }); 
    } 
    next(); 
};