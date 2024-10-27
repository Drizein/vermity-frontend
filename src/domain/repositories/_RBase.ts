import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import axios, { AxiosInstance } from "axios";
import { IRToken } from "@/domain/interfaces/IRToken";

export abstract class BaseRepository {
  private readonly baseUrl: string;
  readonly tokenRepository: IRToken;

  constructor(apiConfig: IApiConfig, tokenRepository: IRToken) {
    this.baseUrl = apiConfig.baseUrl;
    this.tokenRepository = tokenRepository;
  }

  async getAxios() {
    const accessTokenExpired = this.tokenRepository.isAccessTokenExpired();
    if (accessTokenExpired) {
      const refreshResult: boolean = await this.tokenRepository.refreshToken();
      if (!refreshResult) {
        this.tokenRepository.logout();
        throw new Error("Failed to refresh token");
      }
    }
    const accessToken = this.tokenRepository.getAccessToken();
    if (!accessToken) {
      this.tokenRepository.logout();
      throw new Error("Access token is missing");
    }
    return new Promise<AxiosInstance>((resolve) => {
      resolve(
        axios.create({
          baseURL: this.baseUrl,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
    });
  }

  async getAxiosWithoutToken() {
    return new Promise<AxiosInstance>((resolve) => {
      resolve(
        axios.create({
          baseURL: this.baseUrl,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });
  }
}
