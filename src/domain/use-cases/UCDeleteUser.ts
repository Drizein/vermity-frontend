import { IRUser } from "@/domain/interfaces/IRUser";
import { IRAuth } from "@/domain/interfaces/IRAuth";
import { useRouter } from "vue-router";

export class UCDeleteUser {
  constructor(
    private readonly repository: IRUser,
    private readonly authRepository: IRAuth,
  ) {}

  async execute(): Promise<boolean> {
    const deleteUserResult: boolean = await this.repository.deleteUser();
    return new Promise((resolve) => {
      if (!deleteUserResult) {
        resolve(false);
      }
      this.authRepository.logout();
      const router = useRouter();
      router
        .push({ path: "/login" })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}
