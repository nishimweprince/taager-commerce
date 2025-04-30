import { User } from '@/core/domain/entities/user.entity';

export interface ApiUser extends User {
  id: number;
}

export const toApiUser = (user: User): ApiUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  password: user.password,
});

export const toUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  username: apiUser.username,
  email: apiUser.email,
  password: apiUser.password,
});
