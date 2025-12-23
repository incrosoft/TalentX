import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTService } from "../util/jwt";
import { userRoles } from "@/util/roles";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateToken = (requiredRole: string) => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided.",
          code: "NO_TOKEN",
        });
      }

      const decode = JWTService.decodeToken(token);

      if (!userRoles.getUserRole(decode.role, requiredRole)) {
        return res.status(403).json({
          success: false,
          message: "Access denied.",
          code: "INSUFFICIENT_PERMISSIONS",
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        code: "INVALID_TOKEN",
        error: error.message,
      });
    }
  };
};
