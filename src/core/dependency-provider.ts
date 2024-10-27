import UCLogin from "@/domain/use-cases/UCLogin";
import BLOCNavBar from "@/presentation/bloc/BLOCNavBar";
import { useSNavBar } from "@/presentation/store/SNavBar";
import { useRoute, useRouter } from "vue-router";
import { IRAuth } from "@/domain/interfaces/IRAuth";
import { RAuth } from "@/domain/repositories/RAuth";
import { RRegister } from "@/domain/repositories/RRegister";
import { IApiConfig } from "@/domain/interfaces/IApiConfig";
import { BLOCLogin } from "@/presentation/bloc/BLOCLogin";
import { useSLogin } from "@/presentation/store/SLogin";
import { BLOCRegister } from "@/presentation/bloc/BLOCRegister";
import { useSRegister } from "@/presentation/store/SRegister";
import { IRRegister } from "@/domain/interfaces/IRRegister";
import UCRegister from "@/domain/use-cases/UCRegister";
import { IRToken } from "@/domain/interfaces/IRToken";
import { RToken } from "@/domain/repositories/RToken";
import { UCSaveToken } from "@/domain/use-cases/UCSaveToken";
import { IRBuilding } from "@/domain/interfaces/IRBuilding";
import { RBuilding } from "@/domain/repositories/RBuilding";
import UCLogout from "@/domain/use-cases/UCLogout";
import { UCCheckLoginStatus } from "@/domain/use-cases/UCCheckLoginStatus";
import { IRUser } from "@/domain/interfaces/IRUser";
import { RUser } from "@/domain/repositories/RUser";
import { UCModifyUser } from "@/domain/use-cases/UCModifyUser";
import { UCChangePassword } from "@/domain/use-cases/UCChangePassword";
// import { UCDeleteUser } from "@/domain/use-cases/UCDeleteUser";
import { UCGetUser } from "@/domain/use-cases/UCGetUser";
import { BLOCProfile } from "@/presentation/bloc/BLOCProfile";
import { useSProfile } from "@/presentation/store/SProfile";
import { UCShowError } from "@/domain/use-cases/UCShowError";
// import { UCShowWarning } from "@/domain/use-cases/UCShowWarning";
// import { UCShowInfo } from "@/domain/use-cases/UCShowInfo";
import { UCShowSuccess } from "@/domain/use-cases/UCShowSuccess";
import { BLOCSnackbar } from "@/presentation/bloc/BLOCSnackbar";
import { useSSnackbar } from "@/presentation/store/SSnackbar";
import { UCCreateBuilding } from "@/domain/use-cases/UCCreateBuilding";
import { BLOCLandlordPage } from "@/presentation/bloc/BLOCLandlordPage";
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";
import { UCGetAllBuildings } from "@/domain/use-cases/UCGetAllBuildings";
import { UCModifyBuilding } from "@/domain/use-cases/UCModifyBuilding";
import { UCDeleteBuilding } from "@/domain/use-cases/UCDeleteBuilding";
import { IRFlat } from "@/domain/interfaces/IRFlat";
import { UCGetUserFlat } from "@/domain/use-cases/UCGetUserFlat";
import { UCUpdateTenant } from "@/domain/use-cases/UCUpdateTenant";
import { UCUpdateMeterReading } from "@/domain/use-cases/UCUpdateMeterReading";
import { RFlat } from "@/domain/repositories/RFlat";
import { BLOCTenantPage } from "@/presentation/bloc/BLOCTenantPage";
import { useSTenantPage } from "@/presentation/store/STenantPage";
import { UCGetLandlordByFlat } from "@/domain/use-cases/UCGetLandlordByFlat";
import { UCCreateInvoice } from "@/domain/use-cases/UCCreateInvoice";
import { IRInvoice } from "@/domain/interfaces/IRInvoice";
import { RInvoice } from "@/domain/repositories/RInvoice";
import { UCShowInvoice } from "@/domain/use-cases/UCShowInvoice";
import { BLOCInvoices } from "@/presentation/bloc/BLOCInvoices";
import { useSInvoices } from "@/presentation/store/SInvoices";
import { UCSetPaidStatus } from "@/domain/use-cases/UCSetPaidStatus";

export default class DependencyProvider {
  // Repositories
  private readonly tokenRepository: IRToken;
  private readonly authRepository: IRAuth;
  private readonly registerRepository: IRRegister;
  private readonly buildingRepository: IRBuilding;
  private readonly userRepository: IRUser;
  private readonly flatRepository: IRFlat;
  private readonly invoiceRepository: IRInvoice;

  // Use Cases
  private readonly ucLogin: UCLogin;
  private readonly ucRegister: UCRegister;
  private readonly ucSaveToken: UCSaveToken;
  private readonly ucLogout: UCLogout;
  private readonly ucCheckLoginStatus: UCCheckLoginStatus;
  private readonly ucChangePassword: UCChangePassword;
  //private readonly ucDeleteUser: UCDeleteUser;
  private readonly ucGetUser: UCGetUser;
  private readonly ucModifyUser: UCModifyUser;
  private readonly ucShowError: UCShowError;
  // private readonly ucShowWarning: UCShowWarning;
  // private readonly ucShowInfo: UCShowInfo;
  private readonly ucShowSuccess: UCShowSuccess;
  private readonly ucCreateBuilding: UCCreateBuilding;
  private readonly ucGetAllBuildings: UCGetAllBuildings;
  private readonly ucModifyBuilding: UCModifyBuilding;
  private readonly ucDeleteBuilding: UCDeleteBuilding;
  private readonly ucUpdateTenant: UCUpdateTenant;
  private readonly ucUpdateMeterReading: UCUpdateMeterReading;
  private readonly ucGetUserFlat: UCGetUserFlat;
  private readonly ucGetLandlordByFlat: UCGetLandlordByFlat;
  private readonly ucCreateInvoice: UCCreateInvoice;
  private readonly ucShowInvoice: UCShowInvoice;
  private readonly ucSetPaidStatus: UCSetPaidStatus;

  constructor() {
    // init api config
    const apiConfig: IApiConfig = {
      //TODO create constants file
      baseUrl: import.meta.env.VITE_API_URL as string,
    };

    // init repositories
    this.tokenRepository = new RToken();
    this.authRepository = new RAuth(apiConfig, this.tokenRepository);
    this.registerRepository = new RRegister(apiConfig, this.tokenRepository);
    this.buildingRepository = new RBuilding(apiConfig, this.tokenRepository);
    this.userRepository = new RUser(apiConfig, this.tokenRepository);
    this.flatRepository = new RFlat(apiConfig, this.tokenRepository);
    this.invoiceRepository = new RInvoice(apiConfig, this.tokenRepository);

    // init use cases
    this.ucLogin = new UCLogin({ authRepository: this.authRepository });
    this.ucRegister = new UCRegister({
      registerRepository: this.registerRepository,
    });
    this.ucSaveToken = new UCSaveToken(this.tokenRepository);
    this.ucLogout = new UCLogout({ tokenRepository: this.tokenRepository });
    this.ucCheckLoginStatus = new UCCheckLoginStatus({
      tokenRepository: this.tokenRepository,
    });
    this.ucChangePassword = new UCChangePassword(this.userRepository);
    // this.ucDeleteUser = new UCDeleteUser(
    //   this.userRepository,
    //   this.authRepository,
    // );
    this.ucGetUser = new UCGetUser(this.userRepository);
    this.ucModifyUser = new UCModifyUser(this.userRepository);
    const snackbarBloc = new BLOCSnackbar({
      store: useSSnackbar(),
      router: useRouter(),
      route: useRoute(),
    });
    this.ucShowError = new UCShowError(snackbarBloc);
    // this.ucShowWarning = new UCShowWarning(snackbarBloc);
    // this.ucShowInfo = new UCShowInfo(snackbarBloc);
    this.ucShowSuccess = new UCShowSuccess(snackbarBloc);
    this.ucCreateBuilding = new UCCreateBuilding({
      buildingRepository: this.buildingRepository,
    });
    this.ucGetAllBuildings = new UCGetAllBuildings(this.buildingRepository);
    this.ucModifyBuilding = new UCModifyBuilding(this.buildingRepository);
    this.ucDeleteBuilding = new UCDeleteBuilding(this.buildingRepository);
    this.ucUpdateTenant = new UCUpdateTenant(this.flatRepository);
    this.ucUpdateMeterReading = new UCUpdateMeterReading(this.flatRepository);
    this.ucGetUserFlat = new UCGetUserFlat(this.flatRepository);
    this.ucGetLandlordByFlat = new UCGetLandlordByFlat(this.flatRepository);
    this.ucCreateInvoice = new UCCreateInvoice(this.invoiceRepository);
    this.ucShowInvoice = new UCShowInvoice(this.invoiceRepository);
    this.ucSetPaidStatus = new UCSetPaidStatus(this.invoiceRepository);
  }

  public provideInvoiceBLOC(): BLOCInvoices {
    return new BLOCInvoices({
      store: useSInvoices(),
      router: useRouter(),
      route: useRoute(),
      ucGetAllBuildings: this.ucGetAllBuildings,
      ucCreateInvoice: this.ucCreateInvoice,
      ucShowSuccess: this.ucShowSuccess,
      ucShowError: this.ucShowError,
      ucCurrentUser: this.ucGetUser,
      ucGetUserFlat: this.ucGetUserFlat,
      ucSetPaidStatus: this.ucSetPaidStatus,
    });
  }

  public provideTenantPageBLOC(): BLOCTenantPage {
    return new BLOCTenantPage({
      store: useSTenantPage(),
      router: useRouter(),
      route: useRoute(),
      ucGetUserFlat: this.ucGetUserFlat,
      ucUpdateMeterReading: this.ucUpdateMeterReading,
      ucGetLandlordByFlat: this.ucGetLandlordByFlat,
      ucDisplayError: this.ucShowError,
    });
  }

  public provideUcGetUser(): UCGetUser {
    return this.ucGetUser;
  }

  public provideLandlordPageBLOC(): BLOCLandlordPage {
    return new BLOCLandlordPage({
      store: useSLandlordPage(),
      router: useRouter(),
      route: useRoute(),
      ucCreateBuilding: this.ucCreateBuilding,
      ucGetAllBuildings: this.ucGetAllBuildings,
      ucModifyBuilding: this.ucModifyBuilding,
      ucDeleteBuilding: this.ucDeleteBuilding,
      ucShowError: this.ucShowError,
      ucShowSuccess: this.ucShowSuccess,
      ucUpdateTenant: this.ucUpdateTenant,
      ucShowInvoice: this.ucShowInvoice,
    });
  }

  public provideSnackBarBLOC(): BLOCSnackbar {
    return new BLOCSnackbar({
      store: useSSnackbar(),
      router: useRouter(),
      route: useRoute(),
    });
  }

  public provideUCCheckLoginStatus(): UCCheckLoginStatus {
    return this.ucCheckLoginStatus;
  }

  public provideUCLogout(): UCLogout {
    return this.ucLogout;
  }

  public provideNavBarBLOC(): BLOCNavBar {
    return new BLOCNavBar({
      store: useSNavBar(),
      router: useRouter(),
      route: useRoute(),
    });
  }

  public provideLoginBLOC(): BLOCLogin {
    return new BLOCLogin({
      store: useSLogin(),
      router: useRouter(),
      route: useRoute(),
      ucLogin: this.ucLogin,
      ucSaveToken: this.ucSaveToken,
      navBarStore: useSNavBar(),
      ucShowError: this.ucShowError,
    });
  }
  public provideRegisterBLOC(): BLOCRegister {
    return new BLOCRegister({
      store: useSRegister(),
      router: useRouter(),
      route: useRoute(),
      ucRegister: this.ucRegister,
      ucShowError: this.ucShowError,
      ucShowSuccess: this.ucShowSuccess,
    });
  }

  public provideProfileBLOC(): BLOCProfile {
    return new BLOCProfile({
      store: useSProfile(),
      router: useRouter(),
      route: useRoute(),
      ucGetUser: this.ucGetUser,
      ucModifyUser: this.ucModifyUser,
      ucChangePassword: this.ucChangePassword,
      ucShowError: this.ucShowError,
      ucShowSuccess: this.ucShowSuccess,
      navBarStore: useSNavBar(),
    });
  }
}
