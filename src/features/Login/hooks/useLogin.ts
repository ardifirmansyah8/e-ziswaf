import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { BASE_API_URL } from "@/utils/constants";

export const useReqOtpLogin = () => {
  return useMutation({
    mutationKey: ["request-otp-login"],
    mutationFn: (phone: string) =>
      axios({
        method: "get",
        url: `${BASE_API_URL}/auth/requestOtp/login/62${phone}`,
      }).catch((error: any) => {
        throw new Error(error?.response.data.message);
      }),
  });
};
