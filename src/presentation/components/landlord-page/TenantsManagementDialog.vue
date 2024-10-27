<template>
  <v-dialog
    :persistent="true"
    width="auto"
    max-width="800px"
    min-width="700px"
    scrollable
    v-model="store.manageTenantsDialogOpen"
  >
    <v-card max-height="80vh" width="auto">
      <v-card-title>Mieter verwalten</v-card-title>
      <v-card-text>
        <v-card variant="outlined">
          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="12">
                <v-col v-if="store.tenantList.length === 0">
                  Keine Wohnung im Gebäude gefunden!
                </v-col>
                <v-expansion-panels class="fi" multiple variant="accordion">
                  <v-expansion-panel
                    v-for="(_, i) in store.tenantList"
                    :key="i"
                    :title="
                      bloc.getFlatLocationFromTenant(i) ?? `Mieter ${i + 1}`
                    "
                  >
                    <v-expansion-panel-text>
                      <v-card variant="text">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12">
                              <v-switch
                                v-model="store.tenantListExistingSwitches[i]"
                                label="Bestehender Nutzer"
                                hide-details="auto"
                                :color="
                                  store.tenantListExistingSwitches[i] === true
                                    ? 'success'
                                    : 'error'
                                "
                                @change="clearFields(i)"
                              ></v-switch>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="store.tenantList[i].residents"
                                type="number"
                                min="0"
                                label="Anzahl Bewohner"
                                variant="outlined"
                                hide-details="auto"
                                prepend-icon="mdi-account"
                                density="comfortable"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                id="firstName"
                                :disabled="store.tenantListExistingSwitches[i]"
                                v-model="store.tenantList[i].newTenantFirstName"
                                label="Vorname"
                                variant="outlined"
                                hide-details="auto"
                                prepend-icon="mdi-account"
                                density="comfortable"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                id="lastName"
                                :disabled="store.tenantListExistingSwitches[i]"
                                v-model="store.tenantList[i].newTenantLastName"
                                label="Nachname"
                                variant="outlined"
                                hide-details="auto"
                                prepend-icon="mdi-account"
                                density="comfortable"
                              ></v-text-field>
                            </v-col>
                            <v-divider></v-divider>
                            <v-col cols="12">
                              <v-text-field
                                id="email"
                                :disabled="!store.tenantListExistingSwitches[i]"
                                v-model="store.tenantList[i].newTenantEmail"
                                label="E-Mail"
                                variant="outlined"
                                hide-details="auto"
                                prepend-icon="mdi-email"
                                density="comfortable"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions class="d-flex justify-end">
                          <v-btn
                            variant="elevated"
                            color="success"
                            prepend-icon="mdi-content-save"
                            @click="bloc.updateTenant(i)"
                            >Speichern</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          variant="elevated"
          color="success"
          prepend-icon="mdi-check"
          @click="bloc.closeTenantManagementDialog()"
          >Fertig
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";
import { dependencyProvider } from "@/core/main";

const bloc = dependencyProvider.provideLandlordPageBLOC();
const store = useSLandlordPage();

function clearFields(i: number) {
  if (store.tenantListExistingSwitches[i]) {
    store.tenantList[i].newTenantFirstName = "";
    store.tenantList[i].newTenantLastName = "";
  } else {
    store.tenantList[i].newTenantEmail = "";
  }
}
</script>
