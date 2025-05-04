import { BaseEntity } from '@/core/domain/entities/base.entity';
import { User } from '@/core/domain/entities/user.entity';

export interface ApiUser extends BaseEntity {
  username: string;
  email: string;
  password: string;
  name: {
    firstname: string;
    lastname?: string;
  };
}

export const toApiUser = (user: User): ApiUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  password: user.password,
  name: {
    firstname: user.name,
  },
});

export const toUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  username: apiUser.username,
  email: apiUser.email,
  password: apiUser.password,
  name: `${apiUser.name.firstname} ${apiUser.name.lastname}`,
});
