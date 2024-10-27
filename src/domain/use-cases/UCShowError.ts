import { BLOCSnackbar } from "@/presentation/bloc/BLOCSnackbar";
import { ISnackbarPayload } from "@/domain/interfaces/ISnackbarPayload";

export class UCShowError {
  private readonly snackbarBloc: BLOCSnackbar;

  constructor(snackbarBloc: BLOCSnackbar) {
    this.snackbarBloc = snackbarBloc;
  }

  execute(payload: ISnackbarPayload): void {
    this.snackbarBloc.showError(payload);
  }
}
