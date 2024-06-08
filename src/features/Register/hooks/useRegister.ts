import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { BASE_API_URL } from "@/utils/constants";

export const useReqOtpRegister = () => {
  return useMutation({
    mutationKey: ["request-otp-register"],
    mutationFn: (phone: string) =>
      axios({
        method: "get",
        url: `${BASE_API_URL}/auth/requestOtp/daftar/62${phone}`,
      }).catch((error: any) => {
        throw new Error(error?.response.data.message);
      }),
  });
};
