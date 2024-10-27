import { ploc } from "@/presentation/bloc/_PLOC";
import { SInvoices } from "@/presentation/store/SInvoices";
import { RouteLocation, Router } from "vue-router";
import { UCGetAllBuildings } from "@/domain/use-cases/UCGetAllBuildings";
import { IFlatBuildingTableElement } from "@/presentation/interfaces/IFlatBuildingTableElement";
import { UCCreateInvoice } from "@/domain/use-cases/UCCreateInvoice";
import { UCShowSuccess } from "@/domain/use-cases/UCShowSuccess";
import { UCGetUser } from "@/domain/use-cases/UCGetUser";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import { UCGetUserFlat } from "@/domain/use-cases/UCGetUserFlat";
import { UCShowError } from "@/domain/use-cases/UCShowError";
import { UCSetPaidStatus } from "@/domain/use-cases/UCSetPaidStatus";

export class BLOCInvoices extends ploc<SInvoices> {
  private readonly ucGetAllBuildings: UCGetAllBuildings;
  private readonly ucCreateInvoice: UCCreateInvoice;
  private readonly ucShowSuccess: UCShowSuccess;
  private readonly ucShowError: UCShowError;
  private readonly ucSetPaidStatus: UCSetPaidStatus;
  private readonly getCurrentUser: UCGetUser;
  private readonly getUserFlat: UCGetUserFlat;

  constructor({
    store,
    router,
    route,
    ucGetAllBuildings,
    ucCreateInvoice,
    ucShowSuccess,
    ucShowError,
    ucCurrentUser,
    ucGetUserFlat,
    ucSetPaidStatus,
  }: {
    store: SInvoices;
    router: Router;
    route: RouteLocation;
    ucGetAllBuildings: UCGetAllBuildings;
    ucCreateInvoice: UCCreateInvoice;
    ucShowSuccess: UCShowSuccess;
    ucShowError: UCShowError;
    ucCurrentUser: UCGetUser;
    ucGetUserFlat: UCGetUserFlat;
    ucSetPaidStatus: UCSetPaidStatus;
  }) {
    super({ store, router, route });
    this.ucGetAllBuildings = ucGetAllBuildings;
    this.ucCreateInvoice = ucCreateInvoice;
    this.ucShowSuccess = ucShowSuccess;
    this.ucShowError = ucShowError;
    this.getCurrentUser = ucCurrentUser;
    this.getUserFlat = ucGetUserFlat;
    this.ucSetPaidStatus = ucSetPaidStatus;
  }

  async initComponent(): Promise<void> {
    const currentUser = await this.getCurrentUser.execute();
    this.store.tenantMode = !currentUser.roleList.includes(
      UserRolesENUM.LANDLORD,
    );
    await this.getAllFlats();
  }

  async getAllFlats(): Promise<void> {
    if (this.store.tenantMode) {
      const flat = await this.getUserFlat.execute();
      this.store.tableElements = [
        {
          buildingName: "Eigene Wohnung",
          buildingId: 0,
          flat: flat[0],
        },
      ];
    } else {
      const buildings = await this.ucGetAllBuildings.execute();
      const finalList: IFlatBuildingTableElement[] = [];
      buildings.forEach((building) => {
        building.flatList.forEach((flat) => {
          finalList.push({
            buildingName: `${building.address.street}, ${building.address.zip} ${building.address.city}, ${building.address.state}`,
            buildingId: building.buildingId,
            flat: flat,
          });
        });
      });
      this.store.tableElements = finalList;
    }
  }

  openPDF(base64PDF: string) {
    const byteCharacters = atob(base64PDF);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);
    window.open(url); // PDF in einem neuen Tab öffnen

    // Clean up
    URL.revokeObjectURL(url);
  }

  async createInvoice(): Promise<void> {
    try {
      await this.ucCreateInvoice.execute({
        flatId: this.store.createInvoiceFlatId,
        totalRentPaid: this.store.createInvoiceTotalRentPaid,
      });
      await this.getAllFlats();
      this.closeCreateInvoiceDialog();
      this.ucShowSuccess.execute({
        message: "Abrechnung erfolgreich erstellt",
        dismissible: true,
        aliveFor: 3000,
      });
    } catch (e) {
      this.ucShowError.execute({
        message: "Fehler beim Erstellen der Abrechnung",
        dismissible: true,
        aliveFor: 3000,
      });
    }
  }

  openDisplayPDFSDialog(flatId: number): void {
    this.store.displayPDFSFlatId = flatId;
    this.store.displayPDFSDialogOpen = true;
  }

  closeDisplayPDFSDialog(): void {
    this.store.displayPDFSDialogOpen = false;
  }

  openCreateInvoiceDialog(flatId: number): void {
    console.log(flatId);
    this.store.createInvoiceFlatId = flatId;
    this.store.createInvoiceTotalRentPaid = 0;
    this.store.createInvoiceDialogOpen = true;
  }

  closeCreateInvoiceDialog(): void {
    this.store.createInvoiceDialogOpen = false;
  }

  async setPaidStatus(buildingId: number, invoiceId: number): Promise<void> {
    try {
      await this.ucSetPaidStatus.execute({
        buildingId: buildingId,
        invoiceId: invoiceId,
      });
      await this.getAllFlats();
      this.ucShowSuccess.execute({
        message: "Rechnung erfolgreich bezahlt!",
        dismissible: true,
        aliveFor: 3000,
      });
    } catch (e) {
      this.ucShowError.execute({
        message: "Fehler beim Bezahlen",
        dismissible: true,
        aliveFor: 3000,
      });
    }
  }
}
