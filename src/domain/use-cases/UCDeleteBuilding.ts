import { IRBuilding } from "@/domain/interfaces/IRBuilding";
import { DTOBuilding } from "@/domain/dtos/DTOBuilding";

export class UCDeleteBuilding {
  private readonly buildingRepository: IRBuilding;

  constructor(buildingRepository: IRBuilding) {
    this.buildingRepository = buildingRepository;
  }

  async execute(payload: DTOBuilding): Promise<string> {
    return this.buildingRepository.deleteBuilding(payload);
  }
}
