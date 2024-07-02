import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_API_URL } from "@/utils/constant";

import type { IProfileLembaga } from "@/features/Lembaga/types";
import type { IDonationPayload } from "../types";

export const useFetchLembaga = (jenis: string) => {
  return useQuery({
    queryKey: ["select-lembaga"],
    queryFn: async (): Promise<IProfileLembaga[]> => {
      try {
        const resp = await axios({
          method: "GET",
          url: `${BASE_API_URL}/app/lembaga/all?jenis=${jenis}`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!jenis,
  });
};

export const usePaymentMethods = () => {
  return useMutation({
    mutationKey: ["fetch-payment-methods"],
    mutationFn: (amount: string) =>
      axios({
        method: "post",
        url: `${BASE_API_URL}/pay/methods`,
        data: {
          amount,
        },
      }).catch((error: any) => {
        throw new Error(error.response?.data?.message || error.message, {
          cause: error,
        });
      }),
  });
};

export const usePayment = () => {
  return useMutation({
    mutationKey: ["make-payment"],
    mutationFn: (payload: IDonationPayload) =>
      axios({
        method: "post",
        url: `${BASE_API_URL}/pay/inquiry`,
        data: payload,
      }).catch((error: any) => {
        throw new Error(error.response?.data?.message || error.message, {
          cause: error,
        });
      }),
  });
};
