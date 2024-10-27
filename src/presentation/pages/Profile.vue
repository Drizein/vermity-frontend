<template>
  <v-container class="fill-height">
    <v-row align="center">
      <v-col cols="12">
        <EditUserCard />
      </v-col>
      <v-col cols="12">
        <EditAdressCard />
      </v-col>
      <v-col cols="12">
        <ChangePasswordCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import EditUserCard from "@/presentation/components/profile/EditUserCard.vue";
import { onBeforeMount } from "vue";
import { BLOCProfile } from "@/presentation/bloc/BLOCProfile";
import ChangePasswordCard from "@/presentation/components/profile/ChangePasswordCard.vue";
import { dependencyProvider } from "@/core/main";
import EditAdressCard from "@/presentation/components/profile/EditAddressCard.vue";

const bloc: BLOCProfile = dependencyProvider.provideProfileBLOC();

onBeforeMount(() => {
  bloc.initComponent();
});
</script>

<style scoped></style>
