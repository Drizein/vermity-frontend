<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title> Registrieren </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form v-model="store.formValid">
              <v-text-field
                v-model="store.registerPayload.firstName"
                hide-details="auto"
                variant="underlined"
                label="Vorname"
                class="mb-4"
                :rules="[
                  (v: string) => bloc.ruleRequired(v),
                  (v: string) => bloc.ruleMin(v, 3),
                ]"
              ></v-text-field>
              <v-text-field
                v-model="store.registerPayload.lastName"
                hide-details="auto"
                variant="underlined"
                label="Nachname"
                class="mb-4"
                :rules="[
                  (v: string) => bloc.ruleRequired(v),
                  (v: string) => bloc.ruleMin(v, 3),
                ]"
              ></v-text-field>
              <v-select
                v-model="store.registerPayload.gender"
                :items="gender"
                item-title="key"
                item-value="value"
                hide-details="auto"
                variant="underlined"
                label="Gender"
                class="mb-4"
                :rules="[(v: string) => bloc.ruleRequired(v)]"
              ></v-select>
              <v-date-input
                v-model="store.registerPayload.birthDate"
                variant="underlined"
                label="Geburtstag"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar"
                :rules="[(v: string) => bloc.ruleBirthDate(v)]"
                placeholder="dd.mm.yyyy"
              ></v-date-input>
              <v-text-field
                v-model="store.registerPayload.phoneNumber"
                type="number"
                hide-details="auto"
                variant="underlined"
                label="Telefon"
                prepend-inner-icon="mdi-phone"
                prefix="+49"
                class="mb-4"
                :rules="[(v: string) => bloc.rulePhone(v)]"
              ></v-text-field>
              <v-text-field
                v-model="store.registerPayload.email"
                hide-details="auto"
                variant="underlined"
                label="E-Mail"
                prepend-inner-icon="mdi-at"
                class="mb-4"
                :rules="[
                  (v: string) => bloc.ruleRequired(v),
                  (v: string) => bloc.ruleEmail(v),
                ]"
              ></v-text-field>
              <v-text-field
                variant="underlined"
                v-model="store.registerPayload.password"
                :append-icon="store.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="store.showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                label="Passwort"
                :rules="[(v: string) => bloc.rulePassword(v)]"
                counter
                @click:append="store.showPassword = !store.showPassword"
              ></v-text-field>
              <v-select
                v-model="store.registerPayload.roleList"
                :items="role"
                item-title="key"
                item-value="value"
                multiple
                chips
                hide-details="auto"
                variant="underlined"
                label="Rolle"
                class="mb-4"
                :rules="[
                  (v: string) => bloc.ruleRequired(v),
                  (v: string[]) => bloc.ruleEnumValue(v),
                ]"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-end">
            <v-btn variant="tonal" to="/login">zurück</v-btn>
            <v-btn
              color="success"
              :disabled="!store.formValid"
              variant="flat"
              @click="bloc.register()"
              >Registrieren</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useSRegister } from "@/presentation/store/SRegister";
import { VDateInput } from "vuetify/labs/VDateInput";
import { dependencyProvider } from "@/core/main";

const store = useSRegister();
const bloc = dependencyProvider.provideRegisterBLOC();

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
