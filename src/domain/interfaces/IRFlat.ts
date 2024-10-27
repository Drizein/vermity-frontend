import { DTOPatchTenant } from "@/domain/dtos/DTOPatchTenant";
import { DTOPatchMeterReading } from "@/domain/dtos/DTOPatchMeterReading";
import { DTOFlat } from "@/domain/dtos/DTOFlat";
import { DTOTenant } from "@/domain/dtos/DTOTenant";

export interface IRFlat {
  updateTenant(payload: DTOPatchTenant): Promise<string>;
  updateMeterReading(payload: DTOPatchMeterReading): Promise<string>;
  getUserFlat(): Promise<DTOFlat[]>;
  getLandlordByFlatId(flatId: number): Promise<DTOTenant>;
}
