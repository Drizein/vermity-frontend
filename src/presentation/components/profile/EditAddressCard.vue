<template>
  <v-card>
    <v-card-title>Postadresse</v-card-title>
    <v-divider></v-divider>
    <v-form v-model="store.editUserFormValid" @submit.prevent>
      <v-card-text>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="store.user.address.country"
          :disabled="!store.editAddressMode"
          label="Land"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="store.user.address.state"
          :disabled="!store.editAddressMode"
          label="Bundesland"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="store.user.address.zip"
          :disabled="!store.editAddressMode"
          label="Postleitzahl"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.plz(v)]"
          type="number"
          hide-spin-buttons
          clearable
          :value="store.user.address.zip === 0 ? null : store.user.address.zip"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="store.user.address.city"
          :disabled="!store.editAddressMode"
          label="Stadt"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="store.user.address.street"
          :disabled="!store.editAddressMode"
          label="Straße & Hausnummer"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock"
          hint="Passwort muss zur Bestätigung eingegeben werden."
          v-model="store.user.password"
          label="Passwort"
          type="password"
          v-if="store.editAddressMode"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          v-if="store.editAddressMode"
          variant="text"
          icon="mdi-close"
          @click="bloc.switchOffAddressEditMode()"
          color="error"
        ></v-btn>
        <v-btn
          variant="text"
          :color="store.editAddressMode ? 'success' : undefined"
          :type="store.editAddressMode ? 'submit' : undefined"
          :icon="store.editAddressMode ? 'mdi-check' : 'mdi-pencil'"
          @click="
            store.editAddressMode
              ? bloc.submitUserModifyForm()
              : bloc.switchAddressEditMode()
          "
        ></v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useSProfile } from "@/presentation/store/SProfile";
import { inputRules } from "@/presentation/input-rules/InputRules";
import { dependencyProvider } from "@/core/main";

const bloc = dependencyProvider.provideProfileBLOC();
const store = useSProfile();
</script>

<style scoped></style>
