<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6" class="d-flex">
        <LandlordInfoCard />
      </v-col>
      <v-col cols="12" lg="6" class="d-flex">
        <FlatInfoCard />
      </v-col>
      <v-col cols="12">
        <MeterCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import LandlordInfoCard from "@/presentation/components/tenant-page/LandlordInfoCard.vue";
import { dependencyProvider } from "@/core/main";
import { onBeforeMount } from "vue";
import FlatInfoCard from "@/presentation/components/tenant-page/FlatInfoCard.vue";
import MeterCard from "@/presentation/components/tenant-page/MeterCard.vue";

const bloc = dependencyProvider.provideTenantPageBLOC();

onBeforeMount(async () => {
  await bloc.initComponent();
});
</script>
