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
      icon: "/icon/menu-zakat",
      title: "Zakat",
      path: "/lembaga-zakat",
    },
    {
      icon: "/icon/menu-wakaf",
      title: "Wakaf",
      path: "/lembaga-wakaf",
    },
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
    icon: "/icon/total-himpunan.svg",
    color: "bg-green-2",
    type: "total_trx",
  },
  {
    title: "Total Transaksi",
    icon: "/icon/total-transaksi.svg",
    color: "bg-[#ECD5EE]",
    type: "ledger",
  },
  {
    title: "Total Donatur",
    icon: "/icon/total-donatur.svg",
    color: "bg-[#BDE9F3]",
    type: "total_user",
  },
  {
    title: "Total Zakat",
    icon: "/icon/total-zakat.svg",
    color: "bg-[#DEEFFC]",
    type: "zakat",
  },
  {
    title: "Total Wakaf",
    icon: "/icon/total-wakaf.svg",
    color: "bg-[#FCE3DE]",
    type: "wakaf",
  },
  {
    title: "Total Infak",
    icon: "/icon/total-infaq.svg",
    color: "bg-[#F5F2B1]",
    type: "infak",
  },
];

export const JWT =
  typeof window !== "undefined" ? localStorage.getItem("jwt") : "";

export const TRANSACTION_TYPE: { [key: number]: string } = {
  1: "Zakat",
  2: "Infak/Sedekah",
  3: "Wakaf",
};

export const TRX_TYPE_ICON = {
  ZAKAT: "/icon/zakat.svg",
  "INFAK/SEDEKAH": "/icon/infaq.svg",
  WAKAF: "/icon/wakaf.svg",
};
