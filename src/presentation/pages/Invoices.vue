<template>
  <v-data-table
    class="h-100"
    :items="store.tableElements"
    :group-by="[{ key: 'buildingName', order: 'asc' }]"
    :headers="headers"
    item-value="flat.flatId"
  >
    <template v-slot:item.actions="{ item }">
      <v-tooltip text="PDF anzeigen">
        <template #activator="{ props }">
          <v-btn
            class="mr-2"
            variant="tonal"
            icon="mdi-eye"
            size="small"
            v-bind="props"
            @click="bloc.openDisplayPDFSDialog(item.flat.flatId)"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Abrechnung erstellen">
        <template #activator="{ props }">
          <v-btn
            v-if="!store.tenantMode"
            variant="tonal"
            icon="mdi-plus"
            size="small"
            v-bind="props"
            @click="bloc.openCreateInvoiceDialog(item.flat.flatId)"
          ></v-btn>
        </template>
      </v-tooltip>
    </template>
  </v-data-table>
  <CreateInvoiceDialog />
  <DisplayPDFDialog />
</template>

<script setup lang="ts">
import { dependencyProvider } from "@/core/main";
import { onBeforeMount } from "vue";
import { useSInvoices } from "@/presentation/store/SInvoices";
import CreateInvoiceDialog from "@/presentation/components/invoices/CreateInvoiceDialog.vue";
import DisplayPDFDialog from "@/presentation/components/invoices/DisplayPDFDialog.vue";

const bloc = dependencyProvider.provideInvoiceBLOC();
const store = useSInvoices();
const headers = [
  { title: "Gebäude", key: "data-table-group", sortable: false },
  { title: "Standort", key: "flat.location", sortable: false },
  { title: "Räume", key: "flat.rooms" },
  { title: "Bewohner", key: "flat.residents" },
  { title: "Aktionen", key: "actions", sortable: false },
];

onBeforeMount(() => {
  bloc.initComponent();
});
</script>

<style scoped></style>
