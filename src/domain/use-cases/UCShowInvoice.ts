import { IRInvoice } from "@/domain/interfaces/IRInvoice";

export class UCShowInvoice {
  private readonly invoiceRepository: IRInvoice;

  constructor(invoiceRepository: IRInvoice) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(): Promise<any> {
    return await this.invoiceRepository.getAllInvoicesForAllBuildings();
  }
}
