import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_API_URL, JWT } from "@/utils/constant";

import type {
  IUserDashboard,
  IUserPayload,
  IUserProfile,
  IUserTrxDetail,
  IUserTrxResponse,
} from "../types/Profile";

export const useUpdateUser = (token?: string) => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: (payload: IUserPayload) =>
      axios({
        method: "post",
        url: `${BASE_API_URL}/app/user/update`,
        headers: {
          Authorization: `Bearer ${token || JWT}`,
        },
        data: payload,
      }).catch((error: any) => {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }),
  });
};

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ["profile-user"],
    queryFn: async (): Promise<IUserProfile> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/user/profile`,
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
    enabled: !!JWT,
  });
};

export const useFetchUserDashboard = () => {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async (): Promise<IUserDashboard> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/user/dashboard`,
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
    enabled: !!JWT,
  });
};

export const useFetchUserTrx = (page: number) => {
  return useQuery({
    queryKey: ["user-trx", page],
    queryFn: async (): Promise<IUserTrxResponse> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/user/trx/${page}`,
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
    enabled: !!JWT,
  });
};

export const useFetchTrxDetail = (trxNo: string) => {
  return useQuery({
    queryKey: ["user-trx-detail", trxNo],
    queryFn: async (): Promise<IUserTrxDetail> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/trxDetail/${trxNo}`,
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
    enabled: !!JWT && !!trxNo,
  });
};
