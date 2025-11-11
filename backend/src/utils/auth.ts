// import jwt,{Secret} from 'jsonwebtoken';
import jwt from "jsonwebtoken";
import type { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'hello';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateToken = (payload: Record<string, any>): string => {
  const options: SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256'
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};