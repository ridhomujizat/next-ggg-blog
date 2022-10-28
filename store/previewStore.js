import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const intialValue = {
  content: [],
};
const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        ...intialValue,
        setNew: (value) => {
          set((state) => ({ content: [value] }));
        },
        clear: () => set(intialValue),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
