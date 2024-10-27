<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="6"
        class="d-flex"
        v-if="bloc.hasRole(UserRolesENUM.LANDLORD)"
      >
        <DashboardLandlord />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="d-flex"
        v-if="bloc.hasRole(UserRolesENUM.TENANT)"
      >
        <DashboardTenant />
      </v-col>
      <v-col cols="12" lg="6" class="d-flex">
        <DashboardProfile />
      </v-col>
      <v-col cols="12" lg="6" class="d-flex">
        <DashboardInvoice />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import DashboardTenant from "@/presentation/components/dashboard/DashboardTenant.vue";
import DashboardLandlord from "@/presentation/components/dashboard/DashboardLandlord.vue";
import DashboardProfile from "@/presentation/components/dashboard/DashboardProfile.vue";
import DashboardInvoice from "@/presentation/components/dashboard/DashboardInvoice.vue";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import { dependencyProvider } from "@/core/main";

const bloc = dependencyProvider.provideNavBarBLOC();
</script>
