import { IRToken } from "@/domain/interfaces/IRToken";

export default class UCLogout {
  private readonly tokenRepository: IRToken;

  constructor({ tokenRepository }: { tokenRepository: IRToken }) {
    this.tokenRepository = tokenRepository;
  }

  public execute(): void {
    return this.tokenRepository.logout();
  }
}
