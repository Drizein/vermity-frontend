<template>
  <v-card variant="text">
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model="flatList[props.i].location"
            label="Standort"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-home"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-model="flatList[props.i].rooms"
            type="number"
            min="0"
            label="Räume"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-home"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-model="flatList[props.i].squareMeter"
            type="number"
            min="0"
            label="Fläche"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-ruler"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-model="flatList[props.i].residents"
            type="number"
            min="0"
            label="Bewohner"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-account"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            v-model="flatList[props.i].coldRent"
            type="number"
            min="0"
            label="Kaltmiete"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-currency-eur"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            v-model="flatList[props.i].warmRent"
            type="number"
            min="0"
            label="Warmmiete"
            variant="outlined"
            hide-details="auto"
            prepend-icon="mdi-currency-eur"
            class="ma-2"
            density="comfortable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-card
            variant="outlined"
            class="mb-4 mt-4 mx-2"
            v-if="flatList[props.i].meterList.length > 0"
          >
            <v-expansion-panels variant="accordion" elevation="0" multiple>
              <v-expansion-panel
                v-for="(_, meterIndex) in flatList[props.i].meterList"
                :key="v4()"
                :title="`Zähler ${meterIndex + 1}`"
              >
                <v-expansion-panel-text>
                  <MeterForm
                    :flat-index="i"
                    :meter-index="meterIndex"
                  ></MeterForm>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
        <v-col cols="12" class="ma-2">
          <div class="pr-4">
            <v-btn
              color="success"
              block
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="bloc.addMeterToFlat(i)"
            >
              Zähler hinzufügen
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <v-card
            variant="outlined"
            class="mb-4 mt-4 mx-2"
            v-if="flatList[props.i].additionList.length > 0"
          >
            <v-expansion-panels variant="accordion" elevation="0" multiple>
              <v-expansion-panel
                v-for="(_, additionalCostIndex) in flatList[props.i]
                  .additionList"
                :key="v4()"
                :title="`Nebenkosten ${additionalCostIndex + 1}`"
              >
                <v-expansion-panel-text>
                  <AdditionalCostsForm
                    :flat-index="i"
                    :additional-cost-index="additionalCostIndex"
                  ></AdditionalCostsForm>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
        <v-col cols="12" class="ma-2">
          <div class="pr-4">
            <v-btn
              color="success"
              block
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="bloc.addAdditionalCostToFlat(i)"
            >
              Nebenkosten hinzufügen
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">
      <v-btn color="error" icon="mdi-delete" @click="bloc.removeFlat(props.i)">
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";
import AdditionalCostsForm from "@/presentation/components/landlord-page/AdditionalCostsForm.vue";
import { v4 } from "uuid";
import { dependencyProvider } from "@/core/main";
import MeterForm from "@/presentation/components/landlord-page/MeterForm.vue";

const props = defineProps<{
  i: number;
}>();
const store = useSLandlordPage();
const bloc = dependencyProvider.provideLandlordPageBLOC();
const flatList = store.building.flatList;
</script>

<style scoped></style>
