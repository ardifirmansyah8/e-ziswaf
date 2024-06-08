import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { BASE_API_URL } from "@/utils/constants";

export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ["request-verify-login"],
    mutationFn: ({
      otp,
      phoneNo,
      action,
    }: {
      otp: string;
      phoneNo: string;
      action: string;
    }) =>
      axios({
        method: "post",
        url: `${BASE_API_URL}/auth/verifyOtp`,
        data: {
          otp: otp,
          phoneNo: "62" + phoneNo,
          action,
        },
      }).catch((error: any) => {
        throw new Error(error?.response.data.message);
      }),
  });
};
