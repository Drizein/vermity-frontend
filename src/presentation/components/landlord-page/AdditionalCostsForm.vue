<template>
  <v-card variant="text">
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model="additionalCostList[props.additionalCostIndex].name"
            label="Name"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-home"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="additionalCostList[props.additionalCostIndex].description"
            label="Beschreibung"
            rows="4"
            no-resize
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-text-box"
            class="ma-2"
            density="comfortable"
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" lg="12">
          <v-text-field
            v-model="additionalCostList[props.additionalCostIndex].amount"
            type="number"
            min="0"
            label="Kosten"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-currency-eur"
            class="ma-2"
            density="comfortable"
            suffix="€"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="6">
          <v-select
            v-model="additionalCostList[props.additionalCostIndex].distribution"
            :items="distributionOptions"
            label="Verteilung"
            hide-details="auto"
            item-title="key"
            item-value="value"
            prepend-icon="mdi-format-list-bulleted"
            class="ma-2"
            density="comfortable"
            variant="outlined"
          >
          </v-select>
        </v-col>
        <v-col cols="12" lg="6">
          <v-select
            v-model="additionalCostList[props.additionalCostIndex].frequency"
            :items="frequencyOptions"
            label="Frequenz"
            hide-details="auto"
            item-title="key"
            item-value="value"
            prepend-icon="mdi-calendar"
            class="ma-2"
            density="comfortable"
            variant="outlined"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="error"
        icon="mdi-delete"
        @click="
          mode == 'BUILDING'
            ? bloc.removeOperatingCost(props.additionalCostIndex)
            : bloc.removeAdditionalCostFromFlat(
                props.flatIndex!,
                props.additionalCostIndex,
              )
        "
      >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";
import { dependencyProvider } from "@/core/main";

const props = defineProps<{
  flatIndex?: number;
  additionalCostIndex: number;
}>();
const bloc = dependencyProvider.provideLandlordPageBLOC();
const mode = props.flatIndex === undefined ? "BUILDING" : "FLAT";
const additionalCostList =
  mode == "BUILDING"
    ? useSLandlordPage().building.operatingCosts
    : useSLandlordPage().building.flatList[props.flatIndex!].additionList;

const distributionOptions = [
  { key: "Keine", value: "NONE" },
  { key: "Quadratmeter", value: "SQUARE_METERS" },
  { key: "Personen", value: "PERSON" },
  { key: "Wohnung", value: "FLAT" },
];

const frequencyOptions = [
  { key: "Monatlich", value: "MONTHLY" },
  { key: "Pro Quartal", value: "QUARTERLY" },
  { key: "Jährlich", value: "YEARLY" },
];
</script>

<style scoped></style>
