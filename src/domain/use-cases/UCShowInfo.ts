import { ISnackbarPayload } from "@/domain/interfaces/ISnackbarPayload";
import { BLOCSnackbar } from "@/presentation/bloc/BLOCSnackbar";

export class UCShowInfo {
  private readonly snackbarBloc: BLOCSnackbar;

  constructor(snackbarBloc: BLOCSnackbar) {
    this.snackbarBloc = snackbarBloc;
  }

  execute(payload: ISnackbarPayload): void {
    this.snackbarBloc.showInfo(payload);
  }
}
