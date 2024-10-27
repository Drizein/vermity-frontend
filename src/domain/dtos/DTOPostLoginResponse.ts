import { DTOAddress } from "./DTOAddress";

import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";

export interface DTOPostLoginResponse {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  address: DTOAddress;
  roleList: UserRolesENUM[];
  token: string;
}
