<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title> Anmelden </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="store.loginPayload.email"
                hide-details="auto"
                variant="underlined"
                label="E-Mail"
                class="mb-4"
                :rules="[(v: string) => bloc.ruleRequired(v)]"
                @keydown.enter="bloc.login()"
              ></v-text-field>
              <v-text-field
                variant="underlined"
                v-model="store.loginPayload.password"
                :append-icon="store.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="store.showPassword ? 'text' : 'password'"
                label="Passwort"
                counter
                @click:append="store.showPassword = !store.showPassword"
                :rules="[(v: string) => bloc.ruleRequired(v)]"
                @keydown.enter="bloc.login()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-end">
            <v-btn variant="tonal" to="/register">Registrieren</v-btn>
            <v-btn color="success" variant="flat" @click="bloc.login()"
              >Anmelden</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useSLogin } from "@/presentation/store/SLogin";
import { onMounted } from "vue";
import { dependencyProvider } from "@/core/main";

const depProvider = dependencyProvider;

const store = useSLogin();
const bloc = depProvider.provideLoginBLOC();

onMounted(() => {
  bloc.initComponent();
});
</script>

<style scoped></style>
