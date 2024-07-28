import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useVerifyOtp } from "./useOtp";
import { useReqOtpLogin } from "@/features/Login/hooks/useLogin";

type Props = {
  isOpen: boolean;
  backTo: string;
  phone: string;
  onClose: (type: string) => void;
  onSubmit: (jwt: string) => void;
};

export default function OtpDialog({
  isOpen,
  backTo,
  phone,
  onClose,
  onSubmit,
}: Props) {
  const { toast } = useToast();

  const [otp, setOtp] = useState("");

  const reqOtp = useReqOtpLogin();
  const verifyOtp = useVerifyOtp();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="px-10 py-7 w-[430px]"
        close={false}
        back
        onBack={() => onClose(backTo)}
      >
        <div className="mt-14 flex flex-col gap-7">
          <Label className="text-2xl font-semibold">Kode OTP</Label>
          <p className="text-base">
            Masukkan kode OTP yang telah dikirimkan ke no +62{phone}
          </p>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(val) => setOtp(val)}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            disabled={otp.length < 6}
            onClick={() => {
              verifyOtp.mutate(
                {
                  phoneNo: phone,
                  otp,
                  action: backTo === "login" ? "login" : "daftar",
                },
                {
                  onSuccess: (resp) => {
                    if (resp.data.status === "100") {
                      toast({
                        duration: 1000,
                        description: resp.data.message,
                      });
                      localStorage.setItem("jwt", resp.data.jwt);
                      onSubmit(resp.data.jwt);
                    } else {
                      throw new Error(resp.data.message);
                    }
                  },
                }
              );
            }}
          >
            Verifikasi OTP
          </Button>
          <div className="flex gap-1 justify-center">
            <Label className="text-sm">Belum menerima kode OTP?</Label>
            <Button
              variant={"ghost"}
              className="p-0 h-auto hover:bg-transparent text-blue-1 font-bold"
              onClick={() => {
                reqOtp.mutate(phone, {
                  onSuccess: (resp) => {
                    if (resp.data.status === "100") {
                      toast({
                        duration: 1000,
                        description: resp.data.message,
                      });
                    } else {
                      throw new Error(resp.data.message);
                    }
                  },
                });
              }}
            >
              Minta kembali
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
