import type { RegisterInput, LoginInput } from "../types/auth.types.js";
import prisma from "../config/database.js";
import {hashPassword} from "../utils/auth.js";
import {generateAccessToken, generateRefreshToken} from "../utils/auth.js";
import { compare } from "bcrypt";

export class AuthService {
  // Authentication related methods will go here
  async registerUser(data: RegisterInput) {
    // Logic to register a user
    console.log("Registering user with data:", data);
    const userExist = await prisma.user.findFirst({
      where: { OR:[{username: data.username}, {email: data.email}] },
    })

    if (userExist) {
      throw new Error("User with given username or email already exists");
    }

    //hash password and save user to DB (omitted for brevity)
    const passwordHash = await hashPassword(data.password);

    const user =await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: passwordHash,
        fullName: data.fullName,
      },
      select: {         
        id: true,
        email: true,
        username: true,
        fullName: true,
        createdAt: true, },
    });

    //generate JWT token
    const accessToken = generateAccessToken({ username: user.username });
    const refreshToken = generateRefreshToken({ username: user.username });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      createdAt: user.createdAt,
    };


    return { 
      user: safeUser,
      accessToken,
      refreshToken,
      message: "User registered successfully"
     };
  }

  async loginUser(input: LoginInput) {
    // Logic to login a user
    
    const user = await prisma.user.findUnique({
      where: { username: input.username },
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Password verification logic should be here (omitted for brevity)

    const isPasswordValid = await compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    // Generate JWT token
    const accessToken = generateAccessToken({ username: user.username });
    const refreshToken = generateRefreshToken({ username: user.username });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      createdAt: user.createdAt,
    };

    return {
      user: safeUser,
      accessToken,
      refreshToken,
      message: "User logged in successfully"
    };
    
  }

  // get user by ID
  async getUserById(userId: string) {
    const user  = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new Error("User not found");
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      profilePicUrl: user.profilePicUrl,
      createdAt: user.createdAt,
    };

    return safeUser;
  }

}