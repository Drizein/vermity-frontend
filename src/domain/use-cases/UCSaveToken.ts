import { IRToken } from "@/domain/interfaces/IRToken";
import { DTOToken } from "@/domain/dtos/DTOToken";

export class UCSaveToken {
  private readonly tokenRepository: IRToken;

  constructor(tokenRepository: IRToken) {
    this.tokenRepository = tokenRepository;
  }

  public execute(token: DTOToken) {
    this.tokenRepository.saveTokenCookie(token);
  }
}
