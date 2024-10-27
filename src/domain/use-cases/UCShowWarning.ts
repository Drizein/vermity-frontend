import { ISnackbarPayload } from "@/domain/interfaces/ISnackbarPayload";
import { BLOCSnackbar } from "@/presentation/bloc/BLOCSnackbar";

export class UCShowWarning {
  private readonly snackbarBloc: BLOCSnackbar;

  constructor(snackbarBloc: BLOCSnackbar) {
    this.snackbarBloc = snackbarBloc;
  }

  execute(payload: ISnackbarPayload): void {
    this.snackbarBloc.showWarning(payload);
  }
}
