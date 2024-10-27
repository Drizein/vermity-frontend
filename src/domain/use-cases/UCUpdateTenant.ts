import { IRFlat } from "@/domain/interfaces/IRFlat";
import { DTOPatchTenant } from "@/domain/dtos/DTOPatchTenant";
import { toInteger } from "lodash";

export class UCUpdateTenant {
  private readonly repository: IRFlat;

  constructor(readonly: IRFlat) {
    this.repository = readonly;
  }

  async execute(payload: DTOPatchTenant): Promise<string> {
    payload.residents = toInteger(payload.residents);
    return this.repository.updateTenant(payload);
  }
}
