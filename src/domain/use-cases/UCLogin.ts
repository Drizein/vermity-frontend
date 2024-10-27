import { IRAuth } from "@/domain/interfaces/IRAuth";
import { DTOPostLoginResponse } from "@/domain/dtos/DTOPostLoginResponse";
import { DTOPostLogin } from "@/domain/dtos/DTOPostLogin";

export default class UCLogin {
  private readonly authRepository: IRAuth;

  constructor({ authRepository }: { authRepository: IRAuth }) {
    this.authRepository = authRepository;
  }

  public async execute(payload: DTOPostLogin): Promise<DTOPostLoginResponse> {
    return this.authRepository.login(payload);
  }
}
