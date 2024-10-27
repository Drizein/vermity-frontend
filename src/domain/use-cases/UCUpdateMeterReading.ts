import { IRFlat } from "@/domain/interfaces/IRFlat";
import { DTOPatchMeterReading } from "@/domain/dtos/DTOPatchMeterReading";

export class UCUpdateMeterReading {
  private readonly repository: IRFlat;

  constructor(readonly: IRFlat) {
    this.repository = readonly;
  }

  async execute(payload: DTOPatchMeterReading): Promise<string> {
    return this.repository.updateMeterReading(payload);
  }
}
