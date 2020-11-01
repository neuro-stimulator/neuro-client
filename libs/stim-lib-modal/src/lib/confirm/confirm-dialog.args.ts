export interface ConfirmDialogArgs {
  cancel?: () => void;
  confirm?: () => void;
  message: string;
}
