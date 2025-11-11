import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // Registration logic here
  const user = "call function to create user";
  return res.status(201).json({ message: 'Userr registered successfully', user });
}