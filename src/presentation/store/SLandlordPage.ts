import { defineStore } from "pinia";
import { reactive, Reactive, Ref, ref } from "vue";
import { DTOBuilding } from "@/domain/dtos/DTOBuilding";
import { DTOFlat } from "@/domain/dtos/DTOFlat";
import { DTOPatchTenant } from "@/domain/dtos/DTOPatchTenant";

export const useSLandlordPage = defineStore("SLandlordPage", () => {
  const building: Reactive<DTOBuilding> = reactive<DTOBuilding>({
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
  });
  const manageTenantsFlatList: Ref<DTOFlat[]> = ref<DTOFlat[]>([]);
  const tenantList = ref<DTOPatchTenant[]>([]);
  const tenantListExistingSwitches = ref<boolean[]>([]);
  const createBuildingDialogOpen: Ref<boolean> = ref<boolean>(false);
  const manageTenantsDialogOpen: Ref<boolean> = ref<boolean>(false);
  const buildingsList: Ref<DTOBuilding[]> = ref<DTOBuilding[]>([]);
  const editMode: Ref<boolean> = ref<boolean>(false);
  const invoiceCreated: Ref<boolean> = ref<boolean>(false);
  const residents: number = 0;

  return {
    building,
    createBuildingDialogOpen,
    buildingsList,
    editMode,
    manageTenantsDialogOpen,
    manageTenantsFlatList,
    tenantList,
    tenantListExistingSwitches,
    invoiceCreated,
    residents,
  };
});

export type SLandlordPage = Omit<
  ReturnType<typeof useSLandlordPage>,
  keyof ReturnType<typeof defineStore>
>;
