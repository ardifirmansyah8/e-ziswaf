import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_API_URL } from "@/utils/constant";

import { ILembagaResp } from "../types";

export const useFetchAllLembagaZakat = (page: number, type: string) => {
  return useQuery({
    queryKey: ["all-lembaga-zakat", page, type],
    queryFn: async (): Promise<ILembagaResp> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/lazall/${page}`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: type === "zakat",
  });
};

export const useFetchAllLembagaWakaf = (page: number, type: string) => {
  return useQuery({
    queryKey: ["all-lembaga-wakaf", page],
    queryFn: async (): Promise<ILembagaResp> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/lwall/${page}`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: type === "wakaf",
  });
};
