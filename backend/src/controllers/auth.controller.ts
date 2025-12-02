import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // Registration logic here
  // const user = "call function to create user";
  // return res.status(201).json({ message: 'Userr registered successfully', user });
  // re
  try {
    console.log("Request body:", req.body);
    const user = await authService.registerUser(req.body);
    return res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
}

export const login = async (req:Request,res:Response,next:NextFunction) => {
  try {
    console.log("Login Request body:", req.body);
    const user  = await authService.loginUser(req.body);
    return res.status(200).json({
      message: 'User logged in successfully',
      user,
    });

  } catch (err) {
    next(err);
  }
}