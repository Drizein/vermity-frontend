import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { ISnackbarState } from "@/domain/interfaces/ISnackbarState";

export const useSSnackbar = defineStore("SSnackbar", () => {
  const state: Ref<ISnackbarState> = ref<ISnackbarState>({
    heading: "",
    message: "",
    color: "",
    dismissible: false,
    aliveFor: 0,
    icon: "",
  });
  const open: Ref<boolean> = ref<boolean>(false);

  return {
    state,
    open,
  };
});

export type SSnackbar = Omit<
  ReturnType<typeof useSSnackbar>,
  keyof ReturnType<typeof defineStore>
>;
