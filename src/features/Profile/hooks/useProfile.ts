import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_API_URL, jwt } from "@/utils/constant";

import type {
  IUserDashboard,
  IUserPayload,
  IUserProfile,
  IUserTrxResponse,
} from "../types/Profile";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: (payload: IUserPayload) =>
      axios({
        method: "post",
        url: `${BASE_API_URL}/app/user/update`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: payload,
      }).catch((error: any) => {
        throw new Error(error?.response.data.message);
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
            Authorization: `Bearer ${jwt}`,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error?.response.data.message);
      }
    },
    enabled: !!jwt,
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
            Authorization: `Bearer ${jwt}`,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error?.response.data.message);
      }
    },
  });
};

export const useFetchUserTrx = (page: number) => {
  return useQuery({
    queryKey: ["user-trx"],
    queryFn: async (): Promise<IUserTrxResponse> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/user/trx/${page}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error?.response.data.message);
      }
    },
  });
};
