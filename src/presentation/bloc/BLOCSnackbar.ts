import { ploc } from "@/presentation/bloc/_PLOC";
import { SSnackbar } from "@/presentation/store/SSnackbar";
import { IPLOCDefaultParams } from "@/domain/interfaces/IPLOCDefaultParams";
import { ISnackbarPayload } from "@/domain/interfaces/ISnackbarPayload";

export class BLOCSnackbar extends ploc<SSnackbar> {
  constructor({ store, router, route }: IPLOCDefaultParams<SSnackbar>) {
    super({ store, router, route });
  }

  initComponent(): any {
    this.resetState();
  }

  resetState(): void {
    this.store.open = false;
    this.store.state = {
      heading: "",
      message: "",
      color: "",
      dismissible: false,
      aliveFor: 0,
      icon: "",
    };
  }

  showError({ message, dismissible, aliveFor }: ISnackbarPayload) {
    this.store.open = true;
    this.store.state = {
      heading: "Fehler",
      message,
      color: "error",
      dismissible,
      aliveFor,
      icon: "mdi-alert-circle",
    };
  }

  showSuccess({ message, dismissible, aliveFor }: ISnackbarPayload) {
    this.store.open = true;
    this.store.state = {
      heading: "Erfolg",
      message,
      color: "success",
      dismissible,
      aliveFor,
      icon: "mdi-check-circle",
    };
  }

  showInfo({ message, dismissible, aliveFor }: ISnackbarPayload) {
    this.store.open = true;
    this.store.state = {
      heading: "Info",
      message,
      color: "info",
      dismissible,
      aliveFor,
      icon: "mdi-information",
    };
  }

  showWarning({ message, dismissible, aliveFor }: ISnackbarPayload) {
    this.store.open = true;
    this.store.state = {
      heading: "Warnung",
      message,
      color: "warning",
      dismissible,
      aliveFor,
      icon: "mdi-alert",
    };
  }
}
