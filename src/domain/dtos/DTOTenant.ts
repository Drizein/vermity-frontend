import { GendersENUM } from "@/domain/enums/GendersENUM";
import { DTOAddress } from "@/domain/dtos/DTOAddress";

export interface DTOTenant {
  firstName: string;
  lastName: string;
  gender: GendersENUM;
  phoneNumber: string;
  email: string;
  address: DTOAddress;
}
