import path from "path";

export const BASE_API_URL = "https://api.eziswaf.net/v1";

export const MENU = {
  ziswaf: [
    {
      icon: "/icon/icon-home",
      title: "Beranda",
      path: "/",
    },
    {
      icon: "/icon/icon-wallet",
      title: "Zakat",
      path: "/zakat",
    },
    {
      icon: "/icon/icon-gift",
      title: "Wakaf",
      path: "/wakaf",
    },
    // {
    //   icon: "/icon/icon-masjid",
    //   title: "Masjid",
    // },
    // {
    //   icon: "/icon/icon-book-check",
    //   title: "Program",
    // },
  ],
  others: [
    {
      icon: "/icon/icon-thumb-up",
      title: "Tentang Kami",
      path: "/tentang-kami",
    },
    {
      icon: "/icon/icon-info",
      title: "Informasi",
      path: "/informasi",
    },
  ],
};

export const jwt =
  typeof window !== "undefined" ? window.localStorage.getItem("jwt") : "";
