import { BaseRepository } from "@/domain/repositories/_RBase";
import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import { AxiosResponse } from "axios";
import { DTOPostRegister } from "@/domain/dtos/DTOPostRegister";
import { DTOPostRegisterResponse } from "@/domain/dtos/DTOPostRegisterResponse";
import { IRToken } from "@/domain/interfaces/IRToken";
import { IRRegister } from "@/domain/interfaces/IRRegister";

export class RRegister extends BaseRepository implements IRRegister {
  constructor(apiConfig: IApiConfig, tokenRepository: IRToken) {
    super(apiConfig, tokenRepository);
  }

  async register(payload: DTOPostRegister): Promise<DTOPostRegisterResponse> {
    const axios = await this.getAxiosWithoutToken();
    return new Promise<DTOPostRegisterResponse>((resolve, reject) => {
      axios
        .post("/register", payload)
        .then((response: AxiosResponse) => {
          resolve(response.data as DTOPostRegisterResponse);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
