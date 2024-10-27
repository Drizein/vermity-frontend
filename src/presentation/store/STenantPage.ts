import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { DTOFlat } from "@/domain/dtos/DTOFlat";
import { DTOTenant } from "@/domain/dtos/DTOTenant";
import { GendersENUM } from "@/domain/enums/GendersENUM";

export const useSTenantPage = defineStore("STenantPage", () => {
  const flat: Ref<DTOFlat> = ref<DTOFlat>({
    flatId: 0,
    meterList: [],
    location: "",
    rooms: 0,
    squareMeter: 0,
    residents: 0,
    additionList: [],
    coldRent: 0,
    warmRent: 0,
    invoiceList: [],
  });
  const landlord: Ref<DTOTenant> = ref<DTOTenant>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: GendersENUM.DIVERSE,
    address: {
      street: "",
      state: "",
      zip: null,
      city: "",
      country: "",
    },
  });
  const meterEditModeList: Ref<boolean[]> = ref<boolean[]>([]);

  return {
    flat,
    landlord,
    meterEditModeList,
  };
});

export type STenantPage = Omit<
  ReturnType<typeof useSTenantPage>,
  keyof ReturnType<typeof defineStore>
>;
