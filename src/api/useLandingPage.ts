import axios, { Axios, AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { BASE_API_URL } from "@/utils/constant";

export interface IDashboard {
  ledger: number;
  zakat: number;
  total_trx: number;
  infak: number;
  total_user: number;
  wakaf: number;
}

export interface IChart {
  zakat: number;
  infak: number;
  total: number;
  mnth: string;
  wakaf: number;
}

export interface ILastTrx {
  time: string;
  amount: string;
  trx_no: string;
  from: string;
  to: string;
}

export interface ILandingData {
  dashboard: IDashboard;
  chart: IChart[];
  lastTrx: ILastTrx[];
}

export const useFetchLandingData = () => {
  return useQuery({
    queryKey: ["landing-data"],
    queryFn: async (): Promise<ILandingData> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/landing/all`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
  });
};

interface ILembaga {
  total: number;
  kode: number;
  nama: string;
  trx: number;
  image: string;
  tgl_lahir: string;
  is_verified: 0 | 1;
}

export const useFetchLembagaZakat = () => {
  return useQuery({
    queryKey: ["lembaga-zakat"],
    queryFn: async (): Promise<ILembaga[]> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/mainlaz`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
  });
};

export const useFetchLembagaWakaf = () => {
  return useQuery({
    queryKey: ["lembaga-wakaf"],
    queryFn: async (): Promise<ILembaga[]> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/mainlw`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
  });
};
