// Payload received from client for registration
export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  fullName: string;
}

export type LoginInput = {
  username: string;
  password: string;
};