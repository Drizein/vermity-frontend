import { IRFlat } from "@/domain/interfaces/IRFlat";
import { DTOTenant } from "@/domain/dtos/DTOTenant";

export class UCGetLandlordByFlat {
  private readonly flatRepository: IRFlat;

  constructor(flatRepository: IRFlat) {
    this.flatRepository = flatRepository;
  }

  async execute(flatId: number): Promise<DTOTenant> {
    return this.flatRepository.getLandlordByFlatId(flatId);
  }
}
