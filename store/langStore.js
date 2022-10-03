import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const useLangStore = create(
  devtools(
    persist((set) => ({
      langList: ["en", "idn"],
      lang: "en",
      changeLang: (value) => set({ lang: value }),
    }))
  )
);

export default useLangStore;
