import axios, { Axios, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "@/utils/constants";

export type DashboardType = {
  ledger: number;
  zakat: number;
  total_trx: number;
  infak: number;
  total_user: number;
  wakaf: number;
};

export type ChartType = {
  zakat: number;
  infak: number;
  total: number;
  mnth: string;
  wakaf: number;
};

export type LastTrxType = {
  time: string;
  amount: string;
  trx_no: string;
  from: string;
  to: string;
};

type LandingData = {
  dashboard: DashboardType;
  chart: ChartType[];
  lastTrx: LastTrxType[];
};

type LembagaType = {
  total: number;
  kode: number;
  nama: string;
  trx: number;
  image: string;
  tgl_lahir: string;
  is_verified: 0 | 1;
};

export const useFetchLandingData = () => {
  return useQuery({
    queryKey: ["landing-data"],
    queryFn: async (): Promise<LandingData> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/landing/all`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error?.response.data.message);
      }
    },
  });
};

export const useFetchLembagaZakat = () => {
  return useQuery({
    queryKey: ["lembaga-zakat"],
    queryFn: async (): Promise<LembagaType[]> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/mainlaz`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error?.response.data.message);
      }
    },
  });
};

export const useFetchLembagaWakaf = () => {
  return useQuery({
    queryKey: ["lembaga-wakaf"],
    queryFn: async (): Promise<LembagaType[]> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/mainlw`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error?.response.data.message);
      }
    },
  });
};
