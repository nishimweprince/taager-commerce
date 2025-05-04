import { BaseEntity } from './base.entity';

export interface User extends BaseEntity {
  username: string;
  email: string;
  password: string;
  name?: string;
  address?: UserAddress;
  phone?: string;
}

export interface Auth {
  token: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
};
