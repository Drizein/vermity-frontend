<template>
  <v-dialog
    :persistent="true"
    width="auto"
    max-width="800px"
    v-model="store.createInvoiceDialogOpen"
  >
    <v-card width="450">
      <v-card-title> Abrechnung erstellen </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          label="Wohnung ID"
          :disabled="true"
          v-model="store.createInvoiceFlatId"
          variant="underlined"
          hide-details="auto"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          label="Gesamtbetrag Miete"
          suffix="€"
          v-model="store.createInvoiceTotalRentPaid"
          variant="underlined"
          hide-details="auto"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="bloc.closeCreateInvoiceDialog()"
          class="mr-2"
        >
          Abbrechen
        </v-btn>
        <v-btn color="success" @click="bloc.createInvoice()" variant="flat">
          Erstellen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSInvoices } from "@/presentation/store/SInvoices";
import { dependencyProvider } from "@/core/main";

const store = useSInvoices();
const bloc = dependencyProvider.provideInvoiceBLOC();
</script>

<style scoped></style>
