import { DTOGetUserResponse } from "@/domain/dtos/DTOGetUserResponse";
import { DTOPatchModifyUser } from "@/domain/dtos/DTOPatchModifyUser";
import { DTOPatchChangePassword } from "@/domain/dtos/DTOPatchChangePassword";

export interface IRUser {
  getUser(): Promise<DTOGetUserResponse>;
  modifyUser(payload: DTOPatchModifyUser): Promise<any>;
  changePassword(payload: DTOPatchChangePassword): Promise<boolean>;
  deleteUser(): Promise<boolean>;
}
