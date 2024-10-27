import { ploc } from "@/presentation/bloc/_PLOC";
import { SLogin } from "@/presentation/store/SLogin";
import UCLogin from "@/domain/use-cases/UCLogin";
import { RouteLocation, Router } from "vue-router";
import { DTOPostLoginResponse } from "@/domain/dtos/DTOPostLoginResponse";
import { UCSaveToken } from "@/domain/use-cases/UCSaveToken";
import { SNavBar } from "@/presentation/store/SNavBar";
import { UCShowError } from "@/domain/use-cases/UCShowError";

export class BLOCLogin extends ploc<SLogin> {
  private readonly ucLogin: UCLogin;
  private readonly ucSaveToken: UCSaveToken;
  private readonly navBarStore: SNavBar;
  private readonly ucShowError: UCShowError;

  constructor({
    store,
    router,
    route,
    ucLogin,
    ucSaveToken,
    navBarStore,
    ucShowError,
  }: {
    store: SLogin;
    router: Router;
    route: RouteLocation;
    ucLogin: UCLogin;
    ucSaveToken: UCSaveToken;
    navBarStore: SNavBar;
    ucShowError: UCShowError;
  }) {
    super({ store, router, route });
    this.ucLogin = ucLogin;
    this.ucSaveToken = ucSaveToken;
    this.navBarStore = navBarStore;
    this.ucShowError = ucShowError;
  }

  initComponent(): void {
    this.store.loginPayload = {
      email: "",
      password: "",
    };
  }

  public async login(): Promise<DTOPostLoginResponse> {
    return new Promise<DTOPostLoginResponse>((resolve, reject) => {
      this.ucLogin
        .execute(this.store.loginPayload)
        .then((response) => {
          this.ucSaveToken.execute({
            accessToken: response.token.replaceAll("Bearer ", ""),
            refreshToken: "",
          });
          this.store.currentUser = response;
          this.store.loggedIn = true;
          this.navBarStore.userRoles = response.roleList;
          this.router.push("/").then(() => {
            resolve(response);
          });
        })
        .catch((e) => {
          this.ucShowError.execute({
            message: e.response?.data + " Sind die angegebenen Daten korrekt?",
            dismissible: true,
            aliveFor: 5000,
          });
          reject(e);
        });
    });
  }

  public ruleRequired(v: string): string | boolean {
    if (v != "") return true;
    return "Feld darf nicht leer sein!";
  }

  public ruleMin(v: string, min: number) {
    if (v.length > min) return true;
    return `Mind. ${min} Zeichen!`;
  }
}
