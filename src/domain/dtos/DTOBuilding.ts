import { DTOFlat } from "@/domain/dtos/DTOFlat";
import { DTOAdditionalCost } from "@/domain/dtos/DTOAdditionalCost";
import { DTOAddress } from "@/domain/dtos/DTOAddress";

export interface DTOBuilding {
  buildingId: number;
  flatList: DTOFlat[];
  operatingCosts: DTOAdditionalCost[];
  address: DTOAddress;
}
