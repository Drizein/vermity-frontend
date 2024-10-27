<template>
  <v-card
    class="flex-grow-1"
    v-if="bloc.hasRole(UserRolesENUM.TENANT)"
    to="/tenant"
  >
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2"> mdi-home </v-icon>
      Mieten
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import { dependencyProvider } from "@/core/main";

const bloc = dependencyProvider.provideNavBarBLOC();
</script>
