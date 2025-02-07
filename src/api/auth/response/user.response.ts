import { Role } from '@prisma/client';

export class UserResponse {
  id: string;
  email: string;
  nickname: string;
  role: Role;
  avatarLink: string;
}
