// create SProfile pinia store
//
import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { GendersENUM } from "@/domain/enums/GendersENUM";
import { DTOPatchModifyUser } from "@/domain/dtos/DTOPatchModifyUser";
import { DTOPatchChangePassword } from "@/domain/dtos/DTOPatchChangePassword";

export const useSProfile = defineStore("SProfile", () => {
  const user: Ref<DTOPatchModifyUser> = ref<DTOPatchModifyUser>({
    firstName: "",
    lastName: "",
    gender: GendersENUM.DIVERSE,
    phoneNumber: "",
    email: "",
    birthDate: null,
    address: {
      street: "",
      city: "",
      state: "",
      zip: null,
      country: "",
    },
    roleList: [],
    password: "",
  });
  const editUserFormValid: Ref<boolean> = ref<boolean>(false);
  const editModeUser: Ref<boolean> = ref<boolean>(false);
  const editModeAddress: Ref<boolean> = ref<boolean>(false);

  const changePasswordForm: Ref<DTOPatchChangePassword> =
    ref<DTOPatchChangePassword>({
      oldPassword: "",
      newPassword: "",
    });
  const changePasswordFormValid: Ref<boolean> = ref<boolean>(false);
  const editModeChangePassword: Ref<boolean> = ref<boolean>(false);

  return {
    user,
    editUserFormValid,
    editMode: editModeUser,
    editAddressMode: editModeAddress,
    changePasswordForm,
    changePasswordFormValid,
    editModeChangePassword,
  };
});

export type SProfile = Omit<
  ReturnType<typeof useSProfile>,
  keyof ReturnType<typeof defineStore>
>;
