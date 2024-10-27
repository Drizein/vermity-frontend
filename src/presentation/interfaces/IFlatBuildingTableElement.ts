import { DTOFlat } from "@/domain/dtos/DTOFlat";

export interface IFlatBuildingTableElement {
  buildingName: string;
  buildingId: number;
  flat: DTOFlat;
}
