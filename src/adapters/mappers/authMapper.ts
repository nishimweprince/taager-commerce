import { Auth } from "@/core/domain/entities/user.entity";

export interface ApiAuth {
  token: string;
}

export const toAuth = (apiAuth: ApiAuth): Auth => ({
  token: apiAuth.token,
});
