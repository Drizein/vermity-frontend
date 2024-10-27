import { DTOAddress } from "@/domain/dtos/DTOAddress";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import { GendersENUM } from "@/domain/enums/GendersENUM";

export interface DTOPatchModifyUser {
  firstName: string;
  lastName: string;
  gender: GendersENUM;
  phoneNumber: string;
  email: string;
  birthDate: Date | null;
  address: DTOAddress;
  roleList: UserRolesENUM[];
  password: string;
}
