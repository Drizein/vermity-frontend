import { DTOPostRegister } from "@/domain/dtos/DTOPostRegister";
import { DTOPostRegisterResponse } from "@/domain/dtos/DTOPostRegisterResponse";

export interface IRRegister {
  register(payload: DTOPostRegister): Promise<DTOPostRegisterResponse>;
}
