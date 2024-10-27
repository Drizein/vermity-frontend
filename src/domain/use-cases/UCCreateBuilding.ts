import { IRBuilding } from "@/domain/interfaces/IRBuilding";
import { DTOBuilding } from "@/domain/dtos/DTOBuilding";

export class UCCreateBuilding {
  private readonly buildingRepository: IRBuilding;

  constructor({ buildingRepository }: { buildingRepository: IRBuilding }) {
    this.buildingRepository = buildingRepository;
  }

  async execute(payload: DTOBuilding) {
    return await this.buildingRepository.createBuilding(payload);
  }
}
