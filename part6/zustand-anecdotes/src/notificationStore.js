import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: "",
  action: {
    updateNotification: (message) => {
      (set(() => ({ notification: message })),
        setTimeout(() => {
          set(() => ({ notification: "" }));
        }, 5000));
    },
  },
}));

export const useNotificationMessage = () => {
  return useNotificationStore((state) => state.notification);
};

export const useUpdateNotificationAction = () =>
  useNotificationStore((state) => state.action);
