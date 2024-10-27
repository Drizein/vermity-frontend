import { DTOPostLogin } from "@/domain/dtos/DTOPostLogin";
import { DTOPostLoginResponse } from "@/domain/dtos/DTOPostLoginResponse";

export interface IRAuth {
  login(payload: DTOPostLogin): Promise<DTOPostLoginResponse>;
  logout(): void;
}
