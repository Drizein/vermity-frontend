<template>
  <v-card
    prepend-icon="mdi-home"
    :title="`${store.buildingsList[buildingIndex].address.street}, ${store.buildingsList[buildingIndex].address.zip} ${store.buildingsList[buildingIndex].address.city}`"
  >
    <v-divider></v-divider>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" class="mb-2">
          <v-tooltip location="start" text="Land">
            <template v-slot:activator="{ props }">
              <v-chip v-bind="props" prepend-icon="mdi-map" label>{{
                store.buildingsList[buildingIndex].address.country
              }}</v-chip>
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-tooltip location="start" text="Bundesland">
            <template v-slot:activator="{ props }">
              <v-chip v-bind="props" prepend-icon="mdi-map-marker" label>{{
                store.buildingsList[buildingIndex].address.state
              }}</v-chip>
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-tooltip location="start" text="Kaltmiete gesamt">
            <template v-slot:activator="{ props }">
              <v-chip v-bind="props" prepend-icon="mdi-currency-eur" label>{{
                totalRent ? totalRent : 0
              }}</v-chip>
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-tooltip location="start" text="Nebenkosten (Gebäude)">
            <template v-slot:activator="{ props }">
              <v-chip v-bind="props" prepend-icon="mdi-currency-eur" label>{{
                totalOperationalCosts ? totalOperationalCosts : 0
              }}</v-chip>
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="12">
          <v-tooltip location="start" text="Anzahl Wohnungen">
            <template v-slot:activator="{ props }">
              <v-chip prepend-icon="mdi-home" label v-bind="props">
                {{ store.buildingsList[buildingIndex].flatList.length }}</v-chip
              >
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="error"
        icon="mdi-delete"
        @click="bloc.removeBuilding(buildingIndex)"
      ></v-btn>
      <v-btn
        icon="mdi-account-group"
        @click="bloc.openTenantManagementDialog(buildingIndex)"
      ></v-btn>
      <v-btn
        icon="mdi-pencil"
        @click="bloc.openExistingBuildingToEdit(buildingIndex)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";
import { computed } from "vue";
import { BLOCLandlordPage } from "@/presentation/bloc/BLOCLandlordPage";

const store = useSLandlordPage();
const props = defineProps<{
  buildingIndex: number;
  bloc: BLOCLandlordPage;
}>();

const totalRent = computed(() => {
  return store.buildingsList[props.buildingIndex].flatList.reduce(
    (acc, flat) => acc + flat.coldRent,
    0,
  );
});
const totalOperationalCosts = computed(() => {
  return store.buildingsList[props.buildingIndex].operatingCosts.reduce(
    (acc, opc) => acc + opc.amount,
    0,
  );
});
</script>

<style scoped></style>
