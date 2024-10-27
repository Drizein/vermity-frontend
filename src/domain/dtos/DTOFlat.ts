import { DTOMeter } from "@/domain/dtos/DTOMeter";
import { DTOAdditionalCost } from "@/domain/dtos/DTOAdditionalCost";
import { DTOTenant } from "@/domain/dtos/DTOTenant";

export interface DTOFlat {
  flatId: number;
  meterList: DTOMeter[];
  location: string;
  rooms: number;
  squareMeter: number;
  residents: number;
  additionList: DTOAdditionalCost[];
  coldRent: number;
  warmRent: number;
  tenant?: DTOTenant;
  invoiceList: any[];
}
