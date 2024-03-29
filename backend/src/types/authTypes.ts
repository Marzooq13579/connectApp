import { Role } from "@prisma/client";

export interface UserResponse {
  email: string;
  name: string | null;
  role: Role;
}


export interface UserPayload {
  id: string;
  role: string;
}