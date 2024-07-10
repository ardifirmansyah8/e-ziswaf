import { BASE_API_URL, JWT } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["notifications-user"],
    queryFn: async (): Promise<any> => {
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
