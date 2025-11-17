import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth.js";
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
  // console.log(authHeader?.startsWith('Bearer '),"hello",authHeader)
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
// console.log("Auth Header:", authHeader);
  const token = authHeader.split(' ')[1];
  // console.log("Token:", token);
    try {
      if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      } 
      console.log("ssssssssssssss")
      const payload: string |JwtPayload = verifyAccessToken(token);
      console.log("Payload:", payload);
    //   req.user = payload;
    } catch (error) {
      // Normalize the error to an Error instance
      const err = error instanceof Error ? error : new Error(String(error));

      // Structured logging (avoid leaking sensitive data)
      console.error('[auth] Token verification failed', {
        message: err.message,
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
        // include stack in non-production for debugging
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      });

      // Respond with a safe error message. In development, include the error message to help debugging.
      const safeMessage = process.env.NODE_ENV === 'production' ? 'Unauthorized' : `Unauthorized - ${err.message}`;

      // Option A: respond immediately
      return res.status(401).json({ message: safeMessage });

      // Option B (alternative): forward to centralized error handler for consistent handling/logging
      // return next(err);
    }

  next();
}