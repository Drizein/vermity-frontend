import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IFlatBuildingTableElement } from "@/presentation/interfaces/IFlatBuildingTableElement";

export const useSInvoices = defineStore("SInvoices", () => {
  const tableElements: Ref<IFlatBuildingTableElement[]> = ref([]);

  const createInvoiceDialogOpen: Ref<boolean> = ref(false);
  const createInvoiceFlatId: Ref<number> = ref(0);
  const createInvoiceTotalRentPaid: Ref<number> = ref(0);

  const displayPDFSDialogOpen: Ref<boolean> = ref(false);
  const displayPDFSFlatId: Ref<number> = ref(0);

  const tenantMode: Ref<boolean> = ref(false);

  return {
    tableElements,
    createInvoiceDialogOpen,
    createInvoiceFlatId,
    createInvoiceTotalRentPaid,
    displayPDFSDialogOpen,
    displayPDFSFlatId,
    tenantMode,
  };
});

export type SInvoices = Omit<
  ReturnType<typeof useSInvoices>,
  keyof ReturnType<typeof defineStore>
>;
