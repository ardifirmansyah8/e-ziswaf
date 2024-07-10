import { BASE_API_URL, JWT } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchTransactions = (
  page: number,
  type?: string,
  search?: string
) => {
  return useQuery({
    queryKey: ["transactions", page, type, search],
    queryFn: async (): Promise<any> => {
      let path = "";
      path = !type || type === "all" ? "" : `/${type}`;
      path += `/${page}`;
      path += search ? `/search?query=${search}` : "";

      try {
        const resp = await axios({
          method: "get",
          url: `${BASE_API_URL}/app/ledger${path}`,
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
