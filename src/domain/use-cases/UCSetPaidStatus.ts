import { IRInvoice } from "@/domain/interfaces/IRInvoice";
import { DTOPostSetPaidStatus } from "@/domain/dtos/DTOPostSetPaidStatus";

export class UCSetPaidStatus {
  private readonly repository: IRInvoice;

  constructor(readonly: IRInvoice) {
    this.repository = readonly;
  }

  async execute(payload: DTOPostSetPaidStatus): Promise<string> {
    return this.repository.setPaidStatus(payload);
  }
}
