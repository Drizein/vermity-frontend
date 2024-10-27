import { IRBuilding } from "@/domain/interfaces/IRBuilding";
import { DTOBuilding } from "@/domain/dtos/DTOBuilding";

export class UCGetAllBuildings {
  private readonly buildingRepository: IRBuilding;

  constructor(buildingRepository: IRBuilding) {
    this.buildingRepository = buildingRepository;
  }

  async execute(): Promise<DTOBuilding[]> {
    return await this.buildingRepository.getAllBuildings();
  }
}
