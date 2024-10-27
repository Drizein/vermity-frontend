import { ploc } from "@/presentation/bloc/_PLOC";
import { SProfile } from "@/presentation/store/SProfile";
import { RouteLocation, Router } from "vue-router";
import { UCGetUser } from "@/domain/use-cases/UCGetUser";
import { DTOGetUserResponse } from "@/domain/dtos/DTOGetUserResponse";
import { UCModifyUser } from "@/domain/use-cases/UCModifyUser";
import { UCChangePassword } from "@/domain/use-cases/UCChangePassword";
import { UCShowSuccess } from "@/domain/use-cases/UCShowSuccess";
import { UCShowError } from "@/domain/use-cases/UCShowError";
import { SNavBar } from "@/presentation/store/SNavBar";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";

export class BLOCProfile extends ploc<SProfile> {
  private readonly ucGetUser: UCGetUser;
  private readonly ucModifyUser: UCModifyUser;
  private readonly ucChangePassword: UCChangePassword;
  private readonly ucShowError: UCShowError;
  private readonly ucShowSuccess: UCShowSuccess;
  private readonly navBarStore: SNavBar;

  constructor({
    store,
    router,
    route,
    ucGetUser,
    ucModifyUser,
    ucChangePassword,
    ucShowError,
    ucShowSuccess,
    navBarStore,
  }: {
    store: SProfile;
    router: Router;
    route: RouteLocation;
    ucGetUser: UCGetUser;
    ucModifyUser: UCModifyUser;
    ucChangePassword: UCChangePassword;
    ucShowError: UCShowError;
    ucShowSuccess: UCShowSuccess;
    navBarStore: SNavBar;
  }) {
    super({ store, router, route });
    this.ucGetUser = ucGetUser;
    this.ucModifyUser = ucModifyUser;
    this.ucChangePassword = ucChangePassword;
    this.ucShowError = ucShowError;
    this.ucShowSuccess = ucShowSuccess;
    this.navBarStore = navBarStore;
  }

  async initComponent() {
    await this.resetUserModifyForm();
  }

  async resetUserModifyForm(): Promise<void> {
    const userGetResult: DTOGetUserResponse = await this.ucGetUser.execute();
    this.navBarStore.userRoles = userGetResult.roleList;
    this.store.user = {
      firstName: userGetResult.firstName,
      lastName: userGetResult.lastName,
      gender: userGetResult.gender,
      phoneNumber: userGetResult.phoneNumber,
      email: userGetResult.email,
      birthDate: new Date(userGetResult.birthDate),
      address: {
        street: userGetResult.address.street,
        city: userGetResult.address.city,
        state: userGetResult.address.state,
        zip: userGetResult.address.zip,
        country: userGetResult.address.country,
      },
      roleList: userGetResult.roleList,
      password: "",
    };
  }

  resetChangePasswordForm(): void {
    this.store.changePasswordForm = {
      oldPassword: "",
      newPassword: "",
    };
  }

  async submitChangePasswordForm(): Promise<void> {
    if (!this.store.changePasswordFormValid) {
      return;
    }
    try {
      await this.ucChangePassword.execute(this.store.changePasswordForm);
    } catch (e: any) {
      this.ucShowError.execute({
        message: e.toString(),
        dismissible: true,
        aliveFor: 5000,
      });
    }
    this.store.editModeChangePassword = false;
    this.resetChangePasswordForm();
    this.ucShowSuccess.execute({
      message: "Passwort erfolgreich geändert",
      dismissible: true,
      aliveFor: 5000,
    });
  }

  async submitUserModifyForm(): Promise<void> {
    if (!this.store.editUserFormValid) {
      return;
    }
    try {
      await this.ucModifyUser.execute(this.store.user);
      this.ucShowSuccess.execute({
        message: "Benutzerdaten erfolgreich geändert",
        dismissible: true,
        aliveFor: 5000,
      });
    } catch (e: any) {
      this.ucShowError.execute({
        message: e.message + ". Ist das Passwort richtig?",
        dismissible: true,
        aliveFor: 5000,
      });
    }
    this.store.editMode = false;
    this.store.editAddressMode = false;
    await this.resetUserModifyForm();
  }

  switchChangePasswordEditMode(): void {
    this.store.editModeChangePassword = true;
  }

  switchOffChangePasswordEditMode(): void {
    this.store.editModeChangePassword = false;
  }

  switchEditMode(): void {
    this.store.editMode = true;
  }

  switchAddressEditMode(): void {
    this.store.editAddressMode = true;
  }

  switchOffUserEditMode(): void {
    this.store.editMode = false;
  }

  switchOffAddressEditMode(): void {
    this.store.editAddressMode = false;
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
}
