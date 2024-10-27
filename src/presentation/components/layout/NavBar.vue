<template>
  <v-app-bar v-if="mobile">
    <template #prepend>
      <v-btn icon="mdi-menu" @click="bloc.toggleNavBar()" />
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="store.navbarOpened">
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        to="/"
        title="Dashboard"
      ></v-list-item>
      <v-list-item
        v-if="bloc.hasRole(UserRolesENUM.LANDLORD) && loginStore.loggedIn"
        prepend-icon="mdi-office-building"
        to="/landlord"
        title="Vermieten"
      ></v-list-item>
      <v-list-item
        v-if="bloc.hasRole(UserRolesENUM.TENANT) && loginStore.loggedIn"
        prepend-icon="mdi-home"
        to="/tenant"
        title="Mieten"
      ></v-list-item>
      <v-list-item
        v-if="loginStore.loggedIn"
        prepend-icon="mdi-account"
        to="/profile"
        title="Profil"
      ></v-list-item>
      <v-list-item
        v-if="loginStore.loggedIn"
        prepend-icon="mdi-credit-card"
        to="/invoices"
        title="Abrechnungen"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          variant="tonal"
          block
          to="/login"
          :color="loginStore.loggedIn ? 'red' : undefined"
          @click="loginStore.loggedIn ? ucLogout.execute() : undefined"
          >{{ !loginStore.loggedIn ? "Anmelden" : "Abmelden" }}</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useSNavBar } from "@/presentation/store/SNavBar";
import { useDisplay } from "vuetify";
import { useSLogin } from "@/presentation/store/SLogin";
import { dependencyProvider } from "@/core/main";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";

const { mobile } = useDisplay();

const store = useSNavBar();
const loginStore = useSLogin();
const ucLogout = dependencyProvider.provideUCLogout();
const bloc = dependencyProvider.provideNavBarBLOC();
</script>

<style scoped></style>
