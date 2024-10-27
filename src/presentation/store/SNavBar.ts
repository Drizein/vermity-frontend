import { defineStore } from "pinia";
import { ref } from "vue";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";

export const useSNavBar = defineStore("SNavBar", () => {
  const navbarOpened = ref<boolean>(true);
  const userRoles = ref<UserRolesENUM[]>([]);

  return {
    navbarOpened,
    userRoles,
  };
});

export type SNavBar = Omit<
  ReturnType<typeof useSNavBar>,
  keyof ReturnType<typeof defineStore>
>;
