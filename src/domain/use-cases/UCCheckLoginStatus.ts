import { IRToken } from "@/domain/interfaces/IRToken";

export class UCCheckLoginStatus {
  private readonly tokenRepository: IRToken;

  constructor({ tokenRepository }: { tokenRepository: IRToken }) {
    this.tokenRepository = tokenRepository;
  }

  public execute(): boolean {
    return !this.tokenRepository.isAccessTokenExpired();
  }
}
