import { create } from "zustand";

export type ToastNotification = {
  kind:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title: string;
  subTitle: string;
};

interface ToastNotificationState {
  toastNotificaton: ToastNotification | undefined;
  setToastNotification: (
    toastNotification: ToastNotification | undefined,
  ) => void;
}

const useToastNotificationStore = create<ToastNotificationState>()((set) => ({
  toastNotificaton: undefined,
  setToastNotification: (notification) =>
    set(() => ({ toastNotificaton: notification })),
}));

export default useToastNotificationStore;
