import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { DTOPostRegister } from "@/domain/dtos/DTOPostRegister";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import { GendersENUM } from "@/domain/enums/GendersENUM";

export const useSRegister = defineStore("SRegister", () => {
  const showPassword = ref<boolean>(false);
  const registerPayload: Ref<DTOPostRegister> = ref<DTOPostRegister>({
    firstName: "",
    lastName: "",
    gender: GendersENUM.MALE,
    phoneNumber: "",
    email: "",
    birthDate: new Date(),
    password: "",
    roleList: [UserRolesENUM.NONE],
  });
  const formValid: Ref<boolean> = ref<boolean>(false);

  return {
    showPassword,
    registerPayload,
    formValid,
  };
});

export type SRegister = Omit<
  ReturnType<typeof useSRegister>,
  keyof ReturnType<typeof defineStore>
>;
