import { IRUser } from "@/domain/interfaces/IRUser";
import { DTOGetUserResponse } from "@/domain/dtos/DTOGetUserResponse";

export class UCGetUser {
  constructor(private readonly repository: IRUser) {}

  async execute(): Promise<DTOGetUserResponse> {
    return await this.repository.getUser();
  }
}
