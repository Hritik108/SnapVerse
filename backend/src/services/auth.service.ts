import type { RegisterInput } from "../types/auth.types.js";

export class AuthService {
  // Authentication related methods will go here
  async registerUser(data: RegisterInput) {
    // Logic to register a user
    return { id: 1, username: data.username };
  }

}