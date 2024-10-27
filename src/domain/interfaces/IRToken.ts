import { DTOToken } from "@/domain/dtos/DTOToken";

export abstract class IRToken {
  public abstract saveTokenCookie(token: DTOToken): void;
  public abstract getTokenCookie(): DTOToken | undefined;
  public abstract removeTokenCookie(): void;
  public abstract isAccessTokenExpired(): boolean;
  public abstract isRefreshTokenExpired(): boolean;
  public abstract refreshToken(): Promise<boolean>;
  public abstract getAccessToken(): string | undefined;
  public abstract logout(): void;
}
