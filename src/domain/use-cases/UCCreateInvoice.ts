import { IRInvoice } from "@/domain/interfaces/IRInvoice";
import { DTOPostCreateInvoice } from "@/domain/dtos/DTOPostCreateInvoice";

export class UCCreateInvoice {
  private readonly invoiceRepository: IRInvoice;

  constructor(invoiceRepository: IRInvoice) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(payload: DTOPostCreateInvoice) {
    return this.invoiceRepository.createInvoice(payload);
  }
}
