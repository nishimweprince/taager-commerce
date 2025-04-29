import { BaseEntity } from './base.entity';

export interface User extends BaseEntity {
  username: string;
  email: string;
  password: string;
}
