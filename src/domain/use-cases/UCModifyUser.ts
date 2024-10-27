import { IRUser } from "@/domain/interfaces/IRUser";
import { DTOPatchModifyUser } from "@/domain/dtos/DTOPatchModifyUser";

export class UCModifyUser {
  constructor(private readonly repository: IRUser) {}

  async execute(payload: DTOPatchModifyUser): Promise<boolean> {
    return await this.repository.modifyUser(payload);
  }
}
