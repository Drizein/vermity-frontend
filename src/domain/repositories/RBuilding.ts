import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import { IRToken } from "@/domain/interfaces/IRToken";
import { BaseRepository } from "@/domain/repositories/_RBase";
import { DTOBuilding } from "@/domain/dtos/DTOBuilding";
import { IRBuilding } from "@/domain/interfaces/IRBuilding";

export class RBuilding extends BaseRepository implements IRBuilding {
  constructor(apiConfig: IApiConfig, tokenRepository: IRToken) {
    super(apiConfig, tokenRepository);
  }

  async getAllBuildings(): Promise<DTOBuilding[]> {
    const axios = await this.getAxios();
    return new Promise<any>((resolve, reject) => {
      axios
        .get("/auth/getAllBuildingsLandlordView")
        .then((response) => {
          resolve(response.data as DTOBuilding[]);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async createBuilding(payload: DTOBuilding) {
    const axios = await this.getAxios();
    return new Promise<any>((resolve, reject) => {
      axios
        .post("/auth/createBuilding", payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async modifyBuilding(payload: DTOBuilding) {
    const axios = await this.getAxios();
    return new Promise<any>((resolve, reject) => {
      axios
        .patch("/auth/modifyBuilding", payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async deleteBuilding(payload: DTOBuilding) {
    const axios = await this.getAxios();
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`/auth/deleteBuilding`, { data: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
