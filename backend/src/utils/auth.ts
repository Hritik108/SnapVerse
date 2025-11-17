// import jwt,{Secret} from 'jsonwebtoken';
import jwt from "jsonwebtoken";
import type { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from 'crypto';
import type { StringValue } from 'ms'; // Import the specific type

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'hello';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

const ACCESS_TOKEN_EXPIRES_IN = (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as StringValue;;
const ACCESS_TOKEN_SECRET: Secret = process.env.JWT_ACCESS_SECRET! || 'access_secret';

const REFRESH_TOKEN_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as StringValue;
const REFRESH_TOKEN_SECRET: Secret = process.env.JWT_REFRESH_SECRET! || 'refresh_secret';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// export const generateToken = (payload: Record<string, any>): string => {
//   const options: SignOptions = {
//     expiresIn: '1h',
//     algorithm: 'HS256'
//   };
//   return jwt.sign(payload, JWT_SECRET, options);
// };

export const verifyAccessToken = (token: string): string | JwtPayload => {
  console.log("Verifying token with secret:",ACCESS_TOKEN_SECRET);
  console.log(jwt.verify(token, ACCESS_TOKEN_SECRET));
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string): string | JwtPayload => {
  console.log("Verifying token with secret:",REFRESH_TOKEN_SECRET);
  console.log(jwt.verify(token, REFRESH_TOKEN_SECRET));
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Helper to generate Access Token (JWT)
export const generateAccessToken = (payload: Record<string, any>): string => {
    const options: SignOptions = {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    algorithm: 'HS256'
  };
  
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
}

// // Helper to generate Refresh Token (cryptographically random string)
// const generateRefreshToken = () => {
//   return crypto.randomBytes(64).toString('hex'); // Or you can use JWT with longer expiry
// }

// Generate refresh token JWT
export const generateRefreshToken = (payload: Record<string, any>): string => {
    const options: SignOptions = {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    algorithm: 'HS256'
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
};