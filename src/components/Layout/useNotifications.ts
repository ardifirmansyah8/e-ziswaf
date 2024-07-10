import { BASE_API_URL, JWT } from "@/utils/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Notification {
  id: number;
  trx_id: string;
  tanggal: string;
}

export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["notifications-user"],
    queryFn: async (): Promise<Notification[]> => {
      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/user/notif`,
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

export const useUpdateStatus = () => {
  return useMutation({
    mutationKey: ["update-status-notification"],
    mutationFn: (id: number) =>
      axios({
        method: "get",
        url: `${BASE_API_URL}/app/user/notif/${id}`,
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }).catch((error: any) => {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }),
  });
};
