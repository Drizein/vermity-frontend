<template>
  <CreateBuildingDialog :bloc="bloc" />
  <TenantsManagementDialog></TenantsManagementDialog>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-toolbar
          density="comfortable"
          rounded
          title="Gebäude verwalten"
          @click="bloc.openNewBuildingToCreate()"
        >
          <v-toolbar-items>
            <v-btn icon="mdi-plus"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-col>
      <v-col
        v-for="(_, index) in store.buildingsList"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <BuildingCard :bloc="bloc" :buildingIndex="index" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { dependencyProvider } from "@/core/main";
import { useSLandlordPage } from "@/presentation/store/SLandlordPage";
import CreateBuildingDialog from "@/presentation/components/landlord-page/CreateBuildingDialog.vue";
import { onBeforeMount } from "vue";
import BuildingCard from "@/presentation/components/landlord-page/BuildingCard.vue";
import TenantsManagementDialog from "@/presentation/components/landlord-page/TenantsManagementDialog.vue";

onBeforeMount(() => {
  bloc.initComponent();
});

const bloc = dependencyProvider.provideLandlordPageBLOC();
const store = useSLandlordPage();
</script>
