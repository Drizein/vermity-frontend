<template>
  <v-app>
    <v-theme-provider theme="dark">
      <v-locale-provider locale="de">
        <v-main>
          <Snackbar />
          <NavBar />
          <router-view />
        </v-main>
      </v-locale-provider>
    </v-theme-provider>
  </v-app>
</template>

<script lang="ts" setup>
import NavBar from "@/presentation/components/layout/NavBar.vue";
import { onBeforeMount } from "vue";
import { useSLogin } from "@/presentation/store/SLogin";
import Snackbar from "@/presentation/components/layout/Snackbar.vue";
import { dependencyProvider } from "@/core/main";
import { useSNavBar } from "@/presentation/store/SNavBar";

const ucCheckLoginStatus = dependencyProvider.provideUCCheckLoginStatus();
const ucGetUser = dependencyProvider.provideUcGetUser();

onBeforeMount(async () => {
  const loginStatus = ucCheckLoginStatus.execute();
  if (loginStatus) {
    const currentUser = ucGetUser.execute();
    useSLogin().loggedIn = true;
    useSNavBar().userRoles = (await currentUser).roleList;
  }
});
</script>
