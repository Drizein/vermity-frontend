<template>
  <v-card>
    <v-card-title>Passwort ändern</v-card-title>
    <v-divider></v-divider>
    <v-form v-model="store.changePasswordFormValid" @submit.prevent>
      <v-card-text>
        <v-text-field
          prepend-icon="mdi-lock"
          hint="Passwort muss zur Bestätigung eingegeben werden."
          v-model="store.changePasswordForm.oldPassword"
          label="Aktuelles Passwort"
          type="password"
          :disabled="!store.editModeChangePassword"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock"
          hint="Passwort muss zur Bestätigung eingegeben werden."
          v-model="store.changePasswordForm.newPassword"
          label="Neues Passwort"
          type="password"
          :disabled="!store.editModeChangePassword"
          density="comfortable"
          variant="underlined"
          :rules="[
            (v) => inputRules.required(v),
            (v) => inputRules.min(v, 8),
            (v) => inputRules.max(v, 64),
            (v) => inputRules.containsNumber(v),
            (v) => inputRules.containsLowerCase(v),
            (v) => inputRules.containsUpperCase(v),
            (v) => inputRules.containsSpecialChar(v),
          ]"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          v-if="store.editModeChangePassword"
          variant="text"
          icon="mdi-close"
          @click="bloc.switchOffChangePasswordEditMode()"
          color="error"
        ></v-btn>
        <v-btn
          variant="text"
          :color="store.editModeChangePassword ? 'success' : undefined"
          :type="store.editModeChangePassword ? 'submit' : undefined"
          :icon="store.editModeChangePassword ? 'mdi-check' : 'mdi-pencil'"
          @click="
            store.editModeChangePassword
              ? bloc.submitChangePasswordForm()
              : bloc.switchChangePasswordEditMode()
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
