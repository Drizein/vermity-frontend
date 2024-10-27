<template>
  <v-card class="flex-grow-1">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2"> mdi-office-building </v-icon>
      Wohnung
    </v-card-title>
    <v-card-subtitle>
      Hier finden Sie alle Informationen zu Ihrer Wohnung.
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      <v-card variant="tonal">
        <v-card-text>
          <v-row no-gutters>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-map-marker </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">Position:</span>
              <v-chip size="small" label>
                {{ store.flat.location }}
              </v-chip>
            </v-col>
            <v-divider class="my-2"></v-divider>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-currency-eur </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">Warmmiete:</span>
              <v-chip size="small" label> {{ store.flat.warmRent }} € </v-chip>
            </v-col>
            <v-divider class="my-2"></v-divider>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-currency-eur </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">Kaltmiete:</span>
              <v-chip size="small" label> {{ store.flat.coldRent }} € </v-chip>
            </v-col>
            <v-divider class="my-2"></v-divider>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-dots-square </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">Wohnfläche:</span>
              <v-chip size="small" label>
                {{ store.flat.squareMeter }} m²
              </v-chip>
            </v-col>
            <v-divider class="my-2"></v-divider>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-account-group </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">Bewohner:</span>
              <v-chip size="small" label>
                {{ store.flat.residents }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useSTenantPage } from "@/presentation/store/STenantPage";

const store = useSTenantPage();
</script>
