import { DTOBuilding } from "@/domain/dtos/DTOBuilding";

export abstract class IRBuilding {
  abstract getAllBuildings(): Promise<DTOBuilding[]>;
  abstract createBuilding(payload: DTOBuilding): Promise<string>;
  abstract modifyBuilding(payload: DTOBuilding): Promise<string>;
  abstract deleteBuilding(payload: DTOBuilding): Promise<string>;
}
