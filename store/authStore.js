import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const intialValue = {
  user: null,
  role: null,
  token: null,
  isLogin: false,
};
const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        ...intialValue,
        setLogin: ({ token, user, role }) => set({ isLogin: true, token, user, role }),
        setLogout: () => set(intialValue),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
