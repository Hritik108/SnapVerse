import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth.js";
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId?: string;
        email?: string;
        username?: string;
    }
}
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Authentication logic here
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
    try {
      if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      } 
      const payload: string |JwtPayload = verifyToken(token);
      console.log("Payload:", payload);
    //   req.user = payload;
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

  next();
}