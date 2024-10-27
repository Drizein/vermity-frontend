import { BaseRepository } from "@/domain/repositories/_RBase";
import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import { IRToken } from "@/domain/interfaces/IRToken";
import { DTOGetUserResponse } from "@/domain/dtos/DTOGetUserResponse";
import { DTOPatchModifyUser } from "@/domain/dtos/DTOPatchModifyUser";
import { DTOPatchChangePassword } from "@/domain/dtos/DTOPatchChangePassword";
import { IRUser } from "@/domain/interfaces/IRUser";

export class RUser extends BaseRepository implements IRUser {
  constructor(apiConfig: IApiConfig, tokenRepository: IRToken) {
    super(apiConfig, tokenRepository);
  }

  public async getUser(): Promise<DTOGetUserResponse> {
    const axios = await this.getAxios();
    return new Promise<any>((resolve, reject) => {
      axios
        .get("/auth/getUser")
        .then((response) => {
          resolve(response.data as DTOGetUserResponse);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public async modifyUser(payload: DTOPatchModifyUser): Promise<any> {
    const axios = await this.getAxios();
    return new Promise<any>((resolve, reject) => {
      axios
        .patch("/auth/modifyUser", payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          //console.log(e)
          reject(e);
        });
    });
  }

  public async changePassword(
    payload: DTOPatchChangePassword,
  ): Promise<boolean> {
    const axios = await this.getAxios();
    return new Promise<boolean>((resolve, reject) => {
      axios
        .patch("/auth/changePassword", payload)
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public async deleteUser(): Promise<boolean> {
    const axios = await this.getAxios();
    return new Promise<boolean>((resolve, reject) => {
      axios
        .delete("/auth/delete")
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
