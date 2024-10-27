<template>
  <v-card class="flex-grow-1">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2"> mdi-account </v-icon>
      Vermieter
    </v-card-title>
    <v-card-subtitle>
      Hier finden Sie alle relevante Informationen zu Ihrem Vermieter.
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      <v-card variant="tonal">
        <v-card-text>
          <v-row no-gutters>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-account </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">Name:</span>
              <v-chip size="small" label>
                {{ store.landlord.firstName }} {{ store.landlord.lastName }}
              </v-chip>
            </v-col>
            <v-divider class="my-2"></v-divider>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-phone </v-icon>
              <span class="text-body-2 font-weight-bold mr-2"
                >Telefonnummer:</span
              >
              <v-chip
                @click="callPhoneNumber()"
                color="primary"
                size="small"
                label
              >
                {{ store.landlord.phoneNumber }}
              </v-chip>
            </v-col>
            <v-divider class="my-2"></v-divider>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-email </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">E-Mail:</span>
              <v-chip color="primary" @click="sendEmail()" size="small" label>
                {{ store.landlord.email }}
              </v-chip>
            </v-col>
            <v-divider class="my-2"></v-divider>
            <v-col class="d-flex align-center">
              <v-icon class="mr-2"> mdi-home </v-icon>
              <span class="text-body-2 font-weight-bold mr-2">Adresse:</span>
              <v-chip
                v-if="
                  store.landlord.address.street == '' ||
                  store.landlord.address.city == ''
                "
                size="small"
                label
              >
                Adresse nicht verfügbar
              </v-chip>
              <v-chip v-else size="small" label>
                {{ store.landlord.address.street }},
                {{ store.landlord.address.zip }}
                {{ store.landlord.address.city }}
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

function sendEmail() {
  window.location.href = `mailto:${store.landlord.email}`;
}

function callPhoneNumber() {
  window.location.href = `tel:${store.landlord.phoneNumber}`;
}
</script>
