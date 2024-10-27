import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { DTOPostLogin } from "@/domain/dtos/DTOPostLogin";
import { DTOPostLoginResponse } from "@/domain/dtos/DTOPostLoginResponse";

export const useSLogin = defineStore("SLogin", () => {
  const showPassword = ref<boolean>(false);
  const loginPayload: Ref<DTOPostLogin> = ref<DTOPostLogin>({
    email: "",
    password: "",
  });
  const currentUser: Ref<DTOPostLoginResponse | undefined> = ref<
    DTOPostLoginResponse | undefined
  >(undefined);
  const loggedIn = ref<boolean>(false);

  return {
    showPassword,
    loginPayload,
    currentUser,
    loggedIn,
  };
});

export type SLogin = Omit<
  ReturnType<typeof useSLogin>,
  keyof ReturnType<typeof defineStore>
>;
