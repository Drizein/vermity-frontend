import Cookies from "js-cookie";
import { DTOToken } from "@/domain/dtos/DTOToken";
import { jwtDecode } from "jwt-decode";
import { useSLogin } from "@/presentation/store/SLogin";
import { IRToken } from "@/domain/interfaces/IRToken";

export class RToken implements IRToken {
  constructor() {}

  public saveTokenCookie(token: DTOToken) {
    Cookies.set("access-token", token.accessToken);
    Cookies.set("refresh-token", token.refreshToken);
  }

  public logout() {
    const loginStore = useSLogin();
    loginStore.loggedIn = false;
    loginStore.currentUser = undefined;
    this.removeTokenCookie();
  }

  public getTokenCookie(): DTOToken | undefined {
    const accessToken = Cookies.get("access-token");
    const refreshToken = Cookies.get("refresh-token");
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    return undefined;
  }

  public removeTokenCookie() {
    Cookies.remove("access-token");
    Cookies.remove("refresh-token");
  }

  public getAccessToken(): string | undefined {
    return Cookies.get("access-token");
  }

  private getRefreshToken(): string | undefined {
    return Cookies.get("refresh-token");
  }

  private getAccessTokenPayload(): any {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return jwtDecode(accessToken);
    }
    return undefined;
  }

  private getRefreshTokenPayload(): any {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return jwtDecode(refreshToken);
    }
    return undefined;
  }

  public isAccessTokenExpired(): boolean {
    const accessTokenPayload = this.getAccessTokenPayload();
    if (accessTokenPayload) {
      return accessTokenPayload.exp < Date.now() / 1000;
    }
    return true;
  }

  public isRefreshTokenExpired(): boolean {
    const refreshTokenPayload = this.getRefreshTokenPayload();
    if (refreshTokenPayload) {
      return refreshTokenPayload.exp < Date.now() / 1000;
    }
    return true;
  }

  public refreshToken(): Promise<boolean> {
    // TODO: Implement refresh token
    return new Promise<boolean>((resolve) => {
      const e = new Error("NOT IMPLEMENTED YET PLEASE IMPLEMENT THIS FUNCTION");
      console.error(e);
      resolve(false);
    });
  }
}
