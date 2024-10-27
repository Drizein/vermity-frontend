<template>
  <v-dialog
    :persistent="true"
    width="auto"
    max-width="800px"
    scrollable
    v-model="store.createBuildingDialogOpen"
  >
    <v-card max-height="80vh">
      <v-card-title>Gebäude erstellen</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              variant="outlined"
              class="mb-6"
              v-if="store.building.flatList.length > 0"
            >
              <v-expansion-panels variant="accordion" elevation="0" multiple>
                <v-expansion-panel
                  v-for="(_, i) in store.building.flatList"
                  :key="v4()"
                  :title="`Wohnung ${i + 1}`"
                >
                  <v-expansion-panel-text>
                    <FlatForm :i="i"></FlatForm>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
          <v-col cols="12" class="mb-4">
            <v-btn
              color="primary"
              block
              prepend-icon="mdi-plus"
              @click="bloc.addFlat()"
            >
              Wohnung hinzufügen
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card
              variant="outlined"
              class="mb-6 mt-2"
              v-if="store.building.operatingCosts.length > 0"
            >
              <v-expansion-panels variant="accordion" elevation="0" multiple>
                <v-expansion-panel
                  v-for="(_, additionalCostIndex) in store.building
                    .operatingCosts"
                  :key="v4()"
                  :title="`Nebenkosten ${additionalCostIndex + 1}`"
                >
                  <v-expansion-panel-text>
                    <AdditionalCostsForm
                      :additional-cost-index="additionalCostIndex"
                    ></AdditionalCostsForm>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
          <v-col cols="12" class="mb-2">
            <v-btn
              color="primary"
              block
              prepend-icon="mdi-plus"
              @click="bloc.addOperatingCost()"
            >
              Nebenkosten hinzufügen
            </v-btn>
          </v-col>
          <v-col cols="12" class="mb-2">
            <v-text-field
              v-model="store.building.address.country"
              label="Land"
              variant="underlined"
              hide-details="auto"
              prepend-icon="mdi-earth"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" class="mb-2">
            <v-text-field
              v-model="store.building.address.state"
              label="Bundesland"
              variant="underlined"
              hide-details="auto"
              prepend-icon="mdi-earth"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6" class="mb-2">
            <v-text-field
              v-model="store.building.address.city"
              label="Stadt"
              class="mr-4"
              variant="underlined"
              hide-details="auto"
              prepend-icon="mdi-city"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6" class="mb-2">
            <v-text-field
              v-model="store.building.address.zip"
              label="PLZ"
              variant="underlined"
              hide-details="auto"
              prepend-icon="mdi-city"
              type="number"
              hide-spin-buttons
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="store.building.address.street"
              label="Straße & Hausnummer"
              variant="underlined"
              hide-details="auto"
              prepend-icon="mdi-city"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          variant="elevated"
          color="error"
          @click="store.createBuildingDialogOpen = false"
          prepend-icon="mdi-close"
          >Abbrechen
        </v-btn>
        <v-btn
          variant="elevated"
          color="success"
          prepend-icon="mdi-check"
          @click="
            store.editMode ? bloc.modifyBuilding() : bloc.createBuilding()
          "
          >{{ store.editMode ? "Speichern" : "Erstellen" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";
import FlatForm from "@/presentation/components/landlord-page/FlatForm.vue";
import AdditionalCostsForm from "@/presentation/components/landlord-page/AdditionalCostsForm.vue";
import { v4 } from "uuid";
import { dependencyProvider } from "@/core/main";

const bloc = dependencyProvider.provideLandlordPageBLOC();
const store = useSLandlordPage();
</script>
