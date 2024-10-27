<template>
  <v-snackbar
    v-model="store.open"
    :color="store.state.color"
    :timeout="store.state.aliveFor"
    variant="flat"
  >
    <div class="d-flex align-center">
      <v-icon size="16" class="mr-2">{{ store.state.icon }}</v-icon>
      <h3 class="text-h6">{{ store.state.heading }}</h3>
    </div>
    <span>{{ store.state.message }}</span>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSSnackbar } from "@/presentation/store/SSnackbar";
import { watch } from "vue";
import { storeToRefs } from "pinia";

const store = useSSnackbar();

watch(storeToRefs(store).open, () => {
  console.log(store.state);
});
</script>

<style scoped></style>
