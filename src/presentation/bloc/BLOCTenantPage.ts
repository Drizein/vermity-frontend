import { ploc } from "@/presentation/bloc/_PLOC";
import { STenantPage } from "@/presentation/store/STenantPage";
import { UCGetUserFlat } from "@/domain/use-cases/UCGetUserFlat";
import { UCUpdateMeterReading } from "@/domain/use-cases/UCUpdateMeterReading";
import { RouteLocation, Router } from "vue-router";
import { UCGetLandlordByFlat } from "@/domain/use-cases/UCGetLandlordByFlat";
import { DTOMeter } from "@/domain/dtos/DTOMeter";
import { DTOPatchMeterReading } from "@/domain/dtos/DTOPatchMeterReading";
import {UCShowError} from "@/domain/use-cases/UCShowError";

export class BLOCTenantPage extends ploc<STenantPage> {
  private readonly ucGetUserFlat: UCGetUserFlat;
  private readonly ucUpdateMeterReading: UCUpdateMeterReading;
  private readonly ucGetLandlordByFlat: UCGetLandlordByFlat;
  private readonly ucDisplayError: UCShowError;

  constructor({
    store,
    router,
    route,
    ucGetUserFlat,
    ucUpdateMeterReading,
    ucGetLandlordByFlat,
    ucDisplayError,
  }: {
    store: STenantPage;
    router: Router;
    route: RouteLocation;
    ucGetUserFlat: UCGetUserFlat;
    ucUpdateMeterReading: UCUpdateMeterReading;
    ucGetLandlordByFlat: UCGetLandlordByFlat;
    ucDisplayError: UCShowError;
  }) {
    super({ store, router, route });
    this.ucGetUserFlat = ucGetUserFlat;
    this.ucUpdateMeterReading = ucUpdateMeterReading;
    this.ucGetLandlordByFlat = ucGetLandlordByFlat;
    this.ucDisplayError = ucDisplayError;
  }

  async initComponent(): Promise<void> {
    await this.getUserFlat();
    await this.getLandlordByFlatId(this.store.flat.flatId);
  }

  async getUserFlat(): Promise<void> {
    this.store.flat = (await this.ucGetUserFlat.execute())[0];
    this.updateMeterEditModeList();
  }

  async getLandlordByFlatId(flatId: number): Promise<void> {
    this.store.landlord = await this.ucGetLandlordByFlat.execute(flatId);
  }

  async updateMeterReading(meter: DTOMeter, index: number): Promise<void> {
    const payload: DTOPatchMeterReading = {
      flatId: this.store.flat.flatId,
      meterId: meter.meterId,
      newReading: meter.reading,
      picture: "",
    };
    try {
      await this.ucUpdateMeterReading.execute(payload);
    }catch (e) {
      this.ucDisplayError.execute({
        message: "Zählerstand darf nicht kleiner als der alte Zählerstand sein",
        dismissible: true,
        aliveFor: 5000,
      });
    }
    await this.getUserFlat();
    this.disableEditModeForMeter(index);
  }

  enableEditModeForMeter(index: number): void {
    this.store.meterEditModeList[index] = true;
  }

  updateMeterEditModeList(): void {
    this.store.flat.meterList.map(() => {
      return false;
    });
  }

  disableEditModeForMeter(index: number): void {
    this.store.meterEditModeList[index] = false;
  }

  async cancelEditModeForMeter(index: number): Promise<void> {
    this.store.meterEditModeList[index] = false;
    await this.getUserFlat();
  }
}
