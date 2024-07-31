import { User } from "./user.model";

export interface Login {
  token: string;
  user: User;
}
