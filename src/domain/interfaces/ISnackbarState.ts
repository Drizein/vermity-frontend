export interface ISnackbarState {
  heading: string;
  message: string;
  color: string;
  dismissible: boolean;
  aliveFor: number;
  icon: string;
}
