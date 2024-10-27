import { ploc } from "@/presentation/bloc/_PLOC";
import { SLandlordPage } from "@/presentation/store/SLandlordPage";
import { RouteLocation, Router } from "vue-router";
import { UCCreateBuilding } from "@/domain/use-cases/UCCreateBuilding";
import { UCGetAllBuildings } from "@/domain/use-cases/UCGetAllBuildings";
import _ from "lodash";
import { UCModifyBuilding } from "@/domain/use-cases/UCModifyBuilding";
import { UCDeleteBuilding } from "@/domain/use-cases/UCDeleteBuilding";
import { DTOBuilding } from "@/domain/dtos/DTOBuilding";
import { UCShowError } from "@/domain/use-cases/UCShowError";
import { UCShowSuccess } from "@/domain/use-cases/UCShowSuccess";
import { UCUpdateTenant } from "@/domain/use-cases/UCUpdateTenant";
import { UCShowInvoice } from "@/domain/use-cases/UCShowInvoice";

export class BLOCLandlordPage extends ploc<SLandlordPage> {
  private readonly ucCreateBuilding: UCCreateBuilding;
  private readonly ucGetAllBuildings: UCGetAllBuildings;
  private readonly ucModifyBuilding: UCModifyBuilding;
  private readonly ucDeleteBuilding: UCDeleteBuilding;
  private readonly ucShowError: UCShowError;
  private readonly ucShowSuccess: UCShowSuccess;
  private readonly ucUpdateTenant: UCUpdateTenant;

  constructor({
    store,
    router,
    route,
    ucCreateBuilding,
    ucGetAllBuildings,
    ucModifyBuilding,
    ucDeleteBuilding,
    ucShowError,
    ucShowSuccess,
    ucUpdateTenant,
  }: {
    store: SLandlordPage;
    router: Router;
    route: RouteLocation;
    ucCreateBuilding: UCCreateBuilding;
    ucGetAllBuildings: UCGetAllBuildings;
    ucModifyBuilding: UCModifyBuilding;
    ucDeleteBuilding: UCDeleteBuilding;
    ucShowError: UCShowError;
    ucShowSuccess: UCShowSuccess;
    ucUpdateTenant: UCUpdateTenant;
    ucShowInvoice: UCShowInvoice;
  }) {
    super({ store, router, route });
    this.ucCreateBuilding = ucCreateBuilding;
    this.ucGetAllBuildings = ucGetAllBuildings;
    this.ucModifyBuilding = ucModifyBuilding;
    this.ucDeleteBuilding = ucDeleteBuilding;
    this.ucShowError = ucShowError;
    this.ucShowSuccess = ucShowSuccess;
    this.ucUpdateTenant = ucUpdateTenant;
  }

  async initComponent() {
    this.resetState();
    await this.getAllBuildings();
  }

  async removeBuilding(index: number) {
    const payload: DTOBuilding = this.store.buildingsList[index];
    try {
      await this.ucDeleteBuilding.execute(payload);
      this.ucShowSuccess.execute({
        message: "Gebäude erfolgreich gelöscht",
        dismissible: true,
        aliveFor: 5000,
      });
    } catch (e) {
      this.ucShowError.execute({
        message: "Ein Fehler beim Löschen des Gebäudes ist aufgetreten",
        dismissible: true,
        aliveFor: 5000,
      });
    }
    this.resetState();
    await this.getAllBuildings();
  }

  openTenantManagementDialog(index: number) {
    const selectedBuilding = this.store.buildingsList[index];
    this.store.manageTenantsFlatList = _.cloneDeep(selectedBuilding.flatList);
    this.store.manageTenantsFlatList.forEach((flat) => {
      this.store.tenantList.push({
        buildingId: selectedBuilding.buildingId,
        flatId: flat.flatId,
        newTenantEmail: flat.tenant?.email ?? "",
        newTenantFirstName: flat.tenant?.firstName ?? "",
        newTenantLastName: flat.tenant?.lastName ?? "",
        residents: flat.residents ?? 0,
      });
      if (
        flat.tenant &&
        flat.tenant.firstName !== "" &&
        flat.tenant.lastName !== ""
      ) {
        this.store.tenantListExistingSwitches.push(false);
      } else if (
        flat.tenant &&
        flat.tenant.firstName === "" &&
        flat.tenant.lastName === "" &&
        flat.tenant.email !== ""
      ) {
        this.store.tenantListExistingSwitches.push(true);
      } else {
        this.store.tenantListExistingSwitches.push(true);
      }
    });
    console.log(this.store.tenantList);
    this.store.manageTenantsDialogOpen = true;
  }

  toggleTenantExistingSwitch(index: number) {
    this.store.tenantList[index].newTenantEmail = "";
    this.store.tenantList[index].newTenantFirstName = "";
    this.store.tenantList[index].newTenantLastName = "";
    this.store.tenantListExistingSwitches[index] = !this.store.tenantListExistingSwitches[index];
  }

  getFlatLocationFromTenant(tenantIndex: number) {
    const parsedString =
      this.store.manageTenantsFlatList.find(
        (flat) => flat.flatId === this.store.tenantList[tenantIndex].flatId,
      )?.location ?? "";
    if (parsedString === "") {
      return `Mietwohnung ${this.store.tenantList[tenantIndex].flatId}`;
    }
    return parsedString;
  }

  async updateTenant(tenantIndex: number) {
    try {
      await this.ucUpdateTenant.execute(this.store.tenantList[tenantIndex]);
    } catch (e) {
      this.ucShowError.execute({
        message: "Ein Fehler beim Speichern des Mieters ist aufgetreten",
        dismissible: true,
        aliveFor: 5000,
      });
      return;
    }
    this.ucShowSuccess.execute({
      message: "Mieter erfolgreich gespeichert",
      dismissible: true,
      aliveFor: 5000,
    });
  }

  async closeTenantManagementDialog() {
    this.resetState();
    await this.getAllBuildings();
  }

  resetState() {
    this.store.building = {
      buildingId: 0,
      flatList: [],
      operatingCosts: [],
      address: {
        street: "",
        city: "",
        state: "",
        zip: null,
        country: "",
      },
    };
    this.store.createBuildingDialogOpen = false;
    this.store.editMode = false;
    this.store.manageTenantsDialogOpen = false;
    this.store.tenantList = [];
    this.store.tenantListExistingSwitches = [];
    this.store.manageTenantsFlatList = [];
  }

  mapBuilding(index: number) {
    const selectedBuilding = this.store.buildingsList[index];
    this.store.building = _.cloneDeep(selectedBuilding);
  }

  async modifyBuilding() {
    try {
      await this.ucModifyBuilding.execute(this.store.building);
    } catch (e) {
      this.ucShowError.execute({
        message: (e as any).response.data,
        dismissible: true,
        aliveFor: 5000,
      });
      return;
    }
    await this.getAllBuildings();
    this.resetState();
    this.ucShowSuccess.execute({
      message: "Gebäude erfolgreich gespeichert",
      dismissible: true,
      aliveFor: 5000,
    });
  }

  openExistingBuildingToEdit(index: number) {
    this.mapBuilding(index);
    this.enableEditMode();
    this.openCreateBuildingDialog();
  }

  openNewBuildingToCreate() {
    this.resetState();
    this.disableEditMode();
    this.openCreateBuildingDialog();
  }

  enableEditMode() {
    this.store.editMode = true;
  }

  disableEditMode() {
    this.store.editMode = false;
  }

  openCreateBuildingDialog() {
    this.store.createBuildingDialogOpen = true;
  }

  closeCreateBuildingDialog() {
    this.store.createBuildingDialogOpen = false;
  }

  async getAllBuildings() {
    try {
      this.store.buildingsList = await this.ucGetAllBuildings.execute();
    } catch (e) {
      this.ucShowError.execute({
        message: "Ein Fehler beim Laden der Gebäude ist aufgetreten",
        dismissible: true,
        aliveFor: 5000,
      });
    }
  }

  async createBuilding() {
    try {
      await this.ucCreateBuilding.execute(this.store.building);
    } catch (e) {
      this.ucShowError.execute({
        message: "Ein Fehler ist aufgetreten",
        dismissible: true,
        aliveFor: 5000,
      });
      return;
    }
    this.resetState();
    await this.getAllBuildings();
    this.closeCreateBuildingDialog();
    this.ucShowSuccess.execute({
      message: "Gebäude erfolgreich erstellt",
      dismissible: true,
      aliveFor: 5000,
    });
  }

  addFlat() {
    this.store.building.flatList.push({
      flatId: 0,
      meterList: [],
      location: "",
      rooms: 0,
      squareMeter: 0,
      residents: 0,
      additionList: [],
      coldRent: 0,
      warmRent: 0,
      tenant: undefined,
      invoiceList: [],
    });
  }

  removeFlat(index: number) {
    this.store.building.flatList.splice(index, 1);
  }

  addMeterToFlat(flatIndex: number) {
    this.store.building.flatList[flatIndex].meterList.push({
      meterId: 0,
      reading: 0,
      meterNr: "",
      type: "WASSERKALT",
      costPerUnit: 0,
    });
  }

  removeMeterFromFlat(flatIndex: number, meterIndex: number) {
    this.store.building.flatList[flatIndex].meterList.splice(meterIndex, 1);
  }

  addAdditionalCostToFlat(flatIndex: number) {
    this.store.building.flatList[flatIndex].additionList.push({
      id: 0,
      name: "",
      description: "",
      amount: 0,
      distribution: "NONE",
      frequency: "MONTHLY",
    });
  }

  removeAdditionalCostFromFlat(flatIndex: number, additionalCostIndex: number) {
    this.store.building.flatList[flatIndex].additionList.splice(
      additionalCostIndex,
      1,
    );
  }

  addOperatingCost() {
    this.store.building.operatingCosts.push({
      id: 0,
      name: "",
      description: "",
      amount: 0,
      distribution: "NONE",
      frequency: "MONTHLY",
    });
  }

  removeOperatingCost(index: number) {
    this.store.building.operatingCosts.splice(index, 1);
  }
}
