import { UserModel } from "../../shared";

export interface Chat {
  id: string;
  authorUserId: string;
  targetUserId: string;
  receiver?: UserModel;
}
