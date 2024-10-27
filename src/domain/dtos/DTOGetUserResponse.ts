import { GendersENUM } from "@/domain/enums/GendersENUM";
import { DTOAddress } from "@/domain/dtos/DTOAddress";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";

export interface DTOGetUserResponse {
  firstName: string;
  lastName: string;
  gender: GendersENUM;
  phoneNumber: string;
  email: string;
  birthDate: string;
  address: DTOAddress;
  roleList: UserRolesENUM[];
  token: string;
}
