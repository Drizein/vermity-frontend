import { BaseRepository } from "@/domain/repositories/_RBase";
import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import { IRToken } from "@/domain/interfaces/IRToken";
import { DTOPatchTenant } from "@/domain/dtos/DTOPatchTenant";
import { DTOPatchMeterReading } from "@/domain/dtos/DTOPatchMeterReading";
import { DTOFlat } from "@/domain/dtos/DTOFlat";
import { IRFlat } from "@/domain/interfaces/IRFlat";
import { DTOTenant } from "@/domain/dtos/DTOTenant";

export class RFlat extends BaseRepository implements IRFlat {
  constructor(apiConfig: IApiConfig, tokenRepository: IRToken) {
    super(apiConfig, tokenRepository);
  }

  async updateTenant(payload: DTOPatchTenant): Promise<string> {
    const axios = await this.getAxios();
    return new Promise<string>((resolve, reject) => {
      axios
        .patch(`/auth/updateTenant`, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async updateMeterReading(payload: DTOPatchMeterReading): Promise<string> {
    const axios = await this.getAxios();
    return new Promise<string>((resolve, reject) => {
      axios
        .patch(`/auth/updateMeterReading`, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getUserFlat(): Promise<DTOFlat[]> {
    const axios = await this.getAxios();
    return new Promise<DTOFlat[]>((resolve, reject) => {
      axios
        .get(`/auth/getFlat`)
        .then((response) => {
          resolve(response.data as DTOFlat[]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getLandlordByFlatId(flatId: number): Promise<DTOTenant> {
    const axios = await this.getAxios();
    return new Promise<DTOTenant>((resolve, reject) => {
      axios
        .get(`/auth/getLandlordByFlat`, {
          headers: {
            flatId: flatId,
          },
        })
        .then((response) => {
          resolve(response.data as DTOTenant);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
