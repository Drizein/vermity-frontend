<template>
  <v-dialog
    :persistent="true"
    width="auto"
    max-width="800px"
    v-model="store.displayPDFSDialogOpen"
  >
    <v-card width="450" max-height="800">
      <v-card-title> Abrechnungen </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="pdf in store.tableElements.find(
              (e) => e.flat.flatId == store.displayPDFSFlatId,
            )!.flat.invoiceList"
            :key="pdf.invoiceId"
          >
            <v-row justify="space-between" align="center" no-gutters>
              <v-col
                cols="auto"
                @click="bloc.openPDF(pdf.pdf)"
                class="cursor-pointer"
              >
                Rechnung Nr. {{ pdf.invoiceId }} ({{
                  pdf.paid ? "bezahlt" : "offen"
                }})
              </v-col>
              <v-col cols="auto">
                <v-btn
                  color="success"
                  variant="elevated"
                  @click="
                    bloc.setPaidStatus(
                      store.tableElements.find(
                        (e) => e.flat.flatId == store.displayPDFSFlatId,
                      )!.buildingId,
                      pdf.invoiceId,
                    )
                  "
                  class="mr-2"
                  icon="mdi-check"
                />
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          variant="elevated"
          @click="bloc.closeDisplayPDFSDialog()"
          class="mr-2"
        >
          Fertig
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { dependencyProvider } from "@/core/main";
import { useSInvoices } from "@/presentation/store/SInvoices";

const store = useSInvoices();
const bloc = dependencyProvider.provideInvoiceBLOC();
</script>

<style scoped></style>
