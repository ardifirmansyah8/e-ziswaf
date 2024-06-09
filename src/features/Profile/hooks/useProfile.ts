import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_API_URL, jwt } from "@/utils/constant";

import type { UserDashboard, UserPayload, UserProfile } from "../types/Profile";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: (payload: UserPayload) =>
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
    queryFn: async (): Promise<UserProfile> => {
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
  });
};

export const useFetchUserDashboard = () => {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async (): Promise<UserDashboard> => {
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
