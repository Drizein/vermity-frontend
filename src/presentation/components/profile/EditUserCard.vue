<template>
  <v-card>
    <v-card-title>Profil</v-card-title>
    <v-divider></v-divider>
    <v-form v-model="store.editUserFormValid" @submit.prevent>
      <v-card-text>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="store.user.firstName"
          :disabled="!store.editMode"
          label="Name"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="store.user.lastName"
          :disabled="!store.editMode"
          label="Nachname"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
        <v-select
          v-model="store.user.gender"
          :items="gender"
          item-title="key"
          prepend-icon="mdi-account"
          :disabled="!store.editMode"
          item-value="value"
          hide-details="auto"
          variant="underlined"
          label="Gender"
          class="mb-4"
          :rules="[(v: string) => inputRules.required(v)]"
        ></v-select>
        <v-select
          v-model="store.user.roleList"
          :items="role"
          :disabled="!store.editMode"
          item-title="key"
          item-value="value"
          prepend-icon="mdi-account-group"
          multiple
          chips
          hide-details="auto"
          variant="underlined"
          label="Rolle"
          class="mb-4"
          :rules="[
            (v: string) => inputRules.required(v),
            (v: string[]) => bloc.ruleEnumValue(v),
          ]"
        ></v-select>
        <v-text-field
          prepend-icon="mdi-email"
          v-model="store.user.email"
          :disabled="!store.editMode"
          label="E-Mail"
          density="comfortable"
          variant="underlined"
          :rules="[
            (v) => inputRules.required(v),
            (v) => inputRules.validEmail(v),
          ]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-phone"
          v-model="store.user.phoneNumber"
          :disabled="!store.editMode"
          label="Telefonnummer"
          density="comfortable"
          variant="underlined"
          :rules="[
            (v) => inputRules.required(v),
            (v) => inputRules.validPhone(v),
          ]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock"
          hint="Passwort muss zur Bestätigung eingegeben werden."
          v-model="store.user.password"
          label="Passwort"
          type="password"
          v-if="store.editMode"
          density="comfortable"
          variant="underlined"
          :rules="[(v) => inputRules.required(v)]"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          v-if="store.editMode"
          variant="text"
          icon="mdi-close"
          @click="bloc.switchOffUserEditMode()"
          color="error"
        ></v-btn>
        <v-btn
          variant="text"
          :color="store.editMode ? 'success' : undefined"
          :type="store.editMode ? 'submit' : undefined"
          :icon="store.editMode ? 'mdi-check' : 'mdi-pencil'"
          @click="
            store.editMode ? bloc.submitUserModifyForm() : bloc.switchEditMode()
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

const role = [
  { key: "Keine", value: "NONE" },
  { key: "Vermieter", value: "LANDLORD" },
  { key: "Mieter", value: "TENANT" },
];
const gender = [
  { key: "Männlich", value: "MALE" },
  { key: "Weiblich", value: "FEMALE" },
  { key: "Divers", value: "DIVERSE" },
];
</script>

<style scoped></style>
