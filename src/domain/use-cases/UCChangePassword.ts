import { IRUser } from "@/domain/interfaces/IRUser";
import { DTOPatchChangePassword } from "@/domain/dtos/DTOPatchChangePassword";

export class UCChangePassword {
  constructor(private readonly repository: IRUser) {}

  async execute(payload: DTOPatchChangePassword): Promise<boolean> {
    return await this.repository.changePassword(payload);
  }
}
