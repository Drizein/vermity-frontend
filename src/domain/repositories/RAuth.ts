import { BaseRepository } from "@/domain/repositories/_RBase";
import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import { DTOPostLogin } from "@/domain/dtos/DTOPostLogin";
import { DTOPostLoginResponse } from "@/domain/dtos/DTOPostLoginResponse";
import { AxiosResponse } from "axios";
import { IRToken } from "@/domain/interfaces/IRToken";
import { useSLogin } from "@/presentation/store/SLogin";
import { IRAuth } from "@/domain/interfaces/IRAuth";

export class RAuth extends BaseRepository implements IRAuth {
  constructor(apiConfig: IApiConfig, tokenRepository: IRToken) {
    super(apiConfig, tokenRepository);
  }

  async login(payload: DTOPostLogin): Promise<DTOPostLoginResponse> {
    const axios = await this.getAxiosWithoutToken();
    return new Promise<DTOPostLoginResponse>((resolve, reject) => {
      axios
        .post("/login", payload)
        .then((response: AxiosResponse) => {
          resolve(response.data as DTOPostLoginResponse);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  logout(): void {
    const loginStore = useSLogin();
    loginStore.currentUser = undefined;
    this.tokenRepository.removeTokenCookie();
  }
}
