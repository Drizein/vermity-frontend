import { IRFlat } from "@/domain/interfaces/IRFlat";
import { DTOFlat } from "@/domain/dtos/DTOFlat";

export class UCGetUserFlat {
  private readonly repository: IRFlat;

  constructor(readonly: IRFlat) {
    this.repository = readonly;
  }

  async execute(): Promise<DTOFlat[]> {
    return this.repository.getUserFlat();
  }
}
