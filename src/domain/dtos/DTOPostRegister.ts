import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import { GendersENUM } from "@/domain/enums/GendersENUM";

export interface DTOPostRegister {
  firstName: string;
  lastName: string;
  gender: GendersENUM;
  phoneNumber: string;
  email: string;
  birthDate: Date | null;
  password: string;
  roleList: UserRolesENUM[];
}
