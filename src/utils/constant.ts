import path from "path";

export const BASE_API_URL = "https://api.eziswaf.net/v1";
export const BASE_API_URL_MASJED = "https://api.masjed.id/v1";

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
      path: "/lembaga-zakat",
    },
    {
      icon: "/icon/icon-gift",
      title: "Wakaf",
      path: "/lembaga-wakaf",
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
      icon: "/icon/icon-donation",
      title: "Tunaikan",
      path: "/donation",
    },
    {
      icon: "/icon/icon-info",
      title: "Informasi",
      path: "/informasi",
    },
    {
      icon: "/icon/icon-search-transaction",
      title: "Cari Transaksi",
      path: "/cari-transaksi",
    },
  ],
};

export const DASHBOARD_DATA = [
  {
    title: "Total Himpunan",
    icon: "/icon/icon-basket.svg",
    color: "bg-green-2",
    type: "total_trx",
  },
  {
    title: "Total Transaksi",
    icon: "/icon/icon-paper.svg",
    color: "bg-[#ECD5EE]",
    type: "ledger",
  },
  {
    title: "Total Donatur",
    icon: "/icon/icon-scan.svg",
    color: "bg-[#BDE9F3]",
    type: "total_user",
  },
  {
    title: "Total Zakat",
    icon: "/icon/icon-wallet.svg",
    color: "bg-[#DEEFFC]",
    type: "zakat",
  },
  {
    title: "Total Wakaf",
    icon: "/icon/icon-gift.svg",
    color: "bg-[#FCE3DE]",
    type: "wakaf",
  },
  {
    title: "Total Infak",
    icon: "/icon/icon-archive.svg",
    color: "bg-[#F5F2B1]",
    type: "infak",
  },
];

export const JWT =
  typeof window !== "undefined" ? localStorage.getItem("jwt") : "";
