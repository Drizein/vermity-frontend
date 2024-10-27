import { DTOPostCreateInvoice } from "@/domain/dtos/DTOPostCreateInvoice";
import { DTOPostSetPaidStatus } from "@/domain/dtos/DTOPostSetPaidStatus";

export abstract class IRInvoice {
  abstract createInvoice(payload: DTOPostCreateInvoice): Promise<any>;
  abstract setPaidStatus(payload: DTOPostSetPaidStatus): Promise<any>;
  abstract getAllInvoicesForAllBuildings(): Promise<any>;
}
