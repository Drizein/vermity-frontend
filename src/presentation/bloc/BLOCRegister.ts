import { ploc } from "@/presentation/bloc/_PLOC";
import { RouteLocation, Router } from "vue-router";
import { SRegister } from "@/presentation/store/SRegister";
import UCRegister from "@/domain/use-cases/UCRegister";
import { DTOPostRegisterResponse } from "@/domain/dtos/DTOPostRegisterResponse";
import router from "@/core/router";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import { GendersENUM } from "@/domain/enums/GendersENUM";
import { UCShowError } from "@/domain/use-cases/UCShowError";
import { UCShowSuccess } from "@/domain/use-cases/UCShowSuccess";

export class BLOCRegister extends ploc<SRegister> {
  private readonly ucRegister: UCRegister;
  private readonly ucShowError: UCShowError;
  private readonly ucShowSuccess: UCShowSuccess;

  constructor({
    store,
    router,
    route,
    ucRegister,
    ucShowError,
    ucShowSuccess,
  }: {
    store: SRegister;
    router: Router;
    route: RouteLocation;
    ucRegister: UCRegister;
    ucShowError: UCShowError;
    ucShowSuccess: UCShowSuccess;
  }) {
    super({ store, router, route });
    this.ucRegister = ucRegister;
    this.ucShowError = ucShowError;
    this.ucShowSuccess = ucShowSuccess;
  }

  initComponent(): void {
    this.store.registerPayload = {
      firstName: "",
      lastName: "",
      gender: GendersENUM.DIVERSE,
      phoneNumber: "",
      email: "",
      birthDate: new Date(),
      password: "",
      roleList: [UserRolesENUM.NONE],
    };
  }

  public async register(): Promise<DTOPostRegisterResponse> {
    return new Promise<DTOPostRegisterResponse>((resolve, reject) => {
      this.ucRegister
        .execute(this.store.registerPayload)
        .then((response) => {
          router.push("/login").then(() => {
            location.reload();
            this.ucShowSuccess.execute({
              message: "Registrierung erfolgreich!",
              dismissible: true,
              aliveFor: 5000,
            });
            resolve(response);
          });
        })
        .catch((e) => {
          this.ucShowError.execute({
            message: e.response?.data,
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
    if (v.length >= min) return true;
    return `Mind. ${min} Zeichen!`;
  }

  public rulePassword(v: string) {
    //if (v.length >= min) return true;
    const regEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{12,}$/;
    if (regEx.test(v)) return true;
    return `Passwort muss Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen enthalten und mindestens 12 Stellen lang sein!`;
  }

  public ruleEmail(v: string) {
    if (v.length >= 7) if (v.includes("@")) if (v.includes(".")) return true;
    return `Keine gültige E-Mail!`;
  }

  public rulePhone(v: string) {
    if (v.length >= 6) if (!isNaN(+v)) if (v.at(0) !== "0") return true;
    return `Keine gültige Telefonnummer!`;
  }

  public ruleEnumValue(v: string[]) {
    //console.log(v);
    const containsWert1 = v.includes(UserRolesENUM.NONE);
    const containsWert2 = v.includes(UserRolesENUM.LANDLORD);
    const containsWert3 = v.includes(UserRolesENUM.TENANT);
    if (
      (containsWert1 && !(containsWert2 || containsWert3)) ||
      (!containsWert1 && (containsWert2 || containsWert3))
    ) {
      return true;
    }
    return `Ungültige Auswahl! Wählen Sie entweder "Keine" oder "Vermieter"/"Mieter"!`;
  }

  public ruleBirthDate(v: string) {
    const [day, month, year] = v.split(".").map(Number);
    const d = new Date(year, month - 1, day);
    const date = new Date(Date.now());
    date.setFullYear(new Date(Date.now()).getFullYear() - 16);
    if (d.getTime() < date.getTime()) return true;
    return `Keine gültiges Geburtsdatum! (Mindestalter 16 Jahre)`;
  }
}
