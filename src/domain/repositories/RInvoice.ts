import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import { IRToken } from "@/domain/interfaces/IRToken";
import { BaseRepository } from "@/domain/repositories/_RBase";
import { IRInvoice } from "@/domain/interfaces/IRInvoice";
import { DTOPostCreateInvoice } from "@/domain/dtos/DTOPostCreateInvoice";
import { DTOPostSetPaidStatus } from "@/domain/dtos/DTOPostSetPaidStatus";

export class RInvoice extends BaseRepository implements IRInvoice {
  constructor(apiConfig: IApiConfig, tokenRepository: IRToken) {
    super(apiConfig, tokenRepository);
  }

  async createInvoice(payload: DTOPostCreateInvoice) {
    const axios = await this.getAxios();
    return await new Promise<any>((resolve, reject) => {
      axios
        .post(
          "/auth/createInvoice",
          {},
          {
            headers: {
              flatId: payload.flatId,
              totalRentPaid: payload.totalRentPaid,
            },
          },
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async setPaidStatus(payload: DTOPostSetPaidStatus) {
    const axios = await this.getAxios();
    return await new Promise<any>((resolve, reject) => {
      axios
        .get("/auth/updateInvoicePaidStatus", {
          headers: {
            invoiceId: payload.invoiceId,
            buildingId: payload.buildingId,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getAllInvoicesForAllBuildings() {
    const axios = await this.getAxios();
    return await new Promise<any>((resolve, reject) => {
      axios
        .get("/auth/getAllInvoicesForAllBuildings")
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
