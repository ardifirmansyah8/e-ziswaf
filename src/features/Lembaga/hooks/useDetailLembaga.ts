import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_API_URL, JWT } from "@/utils/constant";

import { IProfileLembaga } from "../types";
import { ILandingData } from "@/features/Home/hooks/useLandingPage";

export const useFetchProfileLembaga = (code: string) => {
  return useQuery({
    queryKey: ["profile-lembaga", code],
    queryFn: async (): Promise<IProfileLembaga> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/profile/${code}`,
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!code,
  });
};

export const useFetchDashboardLembaga = (code: string) => {
  return useQuery({
    queryKey: ["dashboard-lembaga", code],
    queryFn: async (): Promise<ILandingData> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/lembaga/dashboard/${code}/${
            new Date().getMonth() + 1
          }`,
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!code,
  });
};

export const useFetchUserPortofolio = (code: string, id: string) => {
  return useQuery({
    queryKey: ["user-portofolio", code, id],
    queryFn: async (): Promise<
      { infak: number; zakat: number; wakaf: number }[]
    > => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/user/protofolio/${code}`,
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!JWT && !!code && !!id,
  });
};
