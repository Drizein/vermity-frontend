<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-home-thermometer</v-icon>Zähler
    </v-card-title>
    <v-card-subtitle>
      Hier können Sie Ihre Zählerstände bearbeiten.
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          lg="4"
          v-for="(meter, index) in store.flat.meterList"
          :key="meter.meterId"
        >
          <v-card variant="tonal">
            <v-card-title>{{
              getCounterUnitOption(meter.type)?.key ?? ""
            }}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row justify="center" no-gutters>
                  <v-col cols="12" class="d-flex justify-center align-center">
                    <div class="circular-border">
                      <span class="text-body-1">
                        {{ meter.reading }}
                      </span>
                      <span class="text-body-2 text-medium-emphasis">
                        {{ meter.costPerUnit }}€ x Einheit
                      </span>
                    </div>
                  </v-col>
                  <v-col cols="12" class="mt-6">
                    <v-text-field
                      :disabled="!store.meterEditModeList[index]"
                      v-model="meter.reading"
                      label="Zählerstand"
                      variant="outlined"
                      hide-details="auto"
                      density="comfortable"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-6">
                    <v-text-field
                      :disabled="true"
                      v-model="meter.meterNr"
                      label="Zählernummer"
                      variant="outlined"
                      hide-details="auto"
                      density="comfortable"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions
              v-if="!store.meterEditModeList[index]"
              class="d-flex justify-end"
            >
              <v-btn
                @click="bloc.enableEditModeForMeter(index)"
                icon="mdi-pencil"
              ></v-btn>
            </v-card-actions>
            <v-card-actions v-else class="d-flex justify-end">
              <v-btn
                color="error"
                @click="bloc.cancelEditModeForMeter(index)"
                icon="mdi-cancel"
              ></v-btn>
              <v-btn
                color="success"
                @click="bloc.updateMeterReading(meter, index)"
                icon="mdi-content-save"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useSTenantPage } from "@/presentation/store/STenantPage";
import { dependencyProvider } from "@/core/main";

const store = useSTenantPage();
const bloc = dependencyProvider.provideTenantPageBLOC();

const counterUnitOptions = [
  { key: "Strom in Kw/h", value: "STROM" },
  { key: "Gas in m³", value: "GAS" },
  { key: "Warmwasser in m³", value: "WASSERWARM" },
  { key: "Kaltwasser in m³", value: "WASSERKALT" },
  { key: "Abwasser in m³", value: "ABWASSER" },
];

function getCounterUnitOption(value: string) {
  return counterUnitOptions.find((option) => option.value === value);
}
</script>

<style scoped>
/*noinspection CssUnresolvedCustomProperty*/
.circular-border {
  border: 6px solid rgb(var(--v-theme-primary)); /* Adjust the border thickness and color as needed */
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 200px; /* Adjust the width as needed */
  height: 200px; /* Adjust the height as needed */
}
</style>
