<template>
  <v-card variant="text">
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model="meterList[props.meterIndex].reading"
            label="Zählerstand"
            variant="outlined"
            type="number"
            min="0"
            hide-details="auto"
            prepend-icon="mdi-counter"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="12">
          <v-text-field
            v-model="meterList[props.meterIndex].meterNr"
            label="Zählernummer"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-counter"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="6">
          <v-select
            v-model="meterList[props.meterIndex].type"
            :items="counterUnitOptions"
            label="Zählertyp"
            hide-details="auto"
            item-title="key"
            item-value="value"
            prepend-icon="mdi-counter"
            class="ma-2"
            density="comfortable"
            variant="outlined"
          >
          </v-select>
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            v-model="meterList[props.meterIndex].costPerUnit"
            suffix="€"
            type="number"
            min="0"
            label="Kosten pro Einheit"
            hide-details="auto"
            prepend-icon="mdi-currency-eur"
            class="ma-2"
            density="comfortable"
            variant="outlined"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <!--
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="error"
        icon="mdi-delete"
        @click="bloc.removeMeterFromFlat(props.flatIndex, props.meterIndex)"
      >
      </v-btn>
    </v-card-actions>
    -->
  </v-card>
</template>

<script setup lang="ts">
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";

const props = defineProps<{
  flatIndex: number;
  meterIndex: number;
}>();
//const bloc = dependencyProvider.provideLandlordPageBLOC();
const meterList =
  useSLandlordPage().building.flatList[props.flatIndex].meterList;

const counterUnitOptions = [
  { key: "Strom in Kw/h", value: "STROM" },
  { key: "Gas in m³", value: "GAS" },
  { key: "Warmwasser in m³", value: "WASSERWARM" },
  { key: "Kaltwasser in m³", value: "WASSERKALT" },
  { key: "Abwasser in m³", value: "ABWASSER" },
];
</script>

<style scoped></style>
