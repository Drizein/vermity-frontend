import { IRBuilding } from "@/domain/interfaces/IRBuilding";
import { DTOBuilding } from "@/domain/dtos/DTOBuilding";

export class UCModifyBuilding {
  private buildingRepository: IRBuilding;

  constructor(buildingRepository: IRBuilding) {
    this.buildingRepository = buildingRepository;
  }

  async execute(payload: DTOBuilding): Promise<string> {
    return this.buildingRepository.modifyBuilding(payload);
  }
}
