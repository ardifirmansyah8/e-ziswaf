import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { isValidPhone } from "@/utils/validation";
import { useReqOtpLogin } from "../hooks/useLogin";

type Props = {
  isOpen: boolean;
  onClose: (type?: string) => void;
  onSubmit: (type: string, phone: string) => void;
};

export default function LoginDialog({ isOpen, onClose, onSubmit }: Props) {
  const { toast } = useToast();

  const [phone, setPhone] = useState("");

  const reqOtp = useReqOtpLogin();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="px-10 py-7 w-[430px]"
        onClose={() => {
          setPhone("");
          onClose();
        }}
      >
        <div className="mt-14 flex flex-col gap-7">
          <div className="flex justify-between items-end">
            <Label className="text-2xl font-semibold">Masuk</Label>
            <Button
              className="text-base p-0 h-auto text-blue-1 hover:bg-transparent font-semibold"
              variant={"ghost"}
              onClick={() => {
                setPhone("");
                onClose("register");
              }}
            >
              Daftar
            </Button>
          </div>
          <Label className="text-base">
            Selamat Datang di E-Ziswaf
            <br />
            Silakan masuk untuk menikmati mudahnya berdonasi dan akses ke fitur
            lainnya
          </Label>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">No Handphone</Label>
            <Input
              id="phone"
              leftIcon={
                <div className="absolute top-2.5 left-2 text-grey-4 text-sm">
                  +62
                </div>
              }
              type="tel"
              pattern={"^[2-9]\\d{7,11}$"}
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
          </div>
          <Button
            disabled={!phone || !isValidPhone(phone)}
            onClick={() => {
              reqOtp.mutate(phone, {
                onSuccess: (resp) => {
                  if (resp.data.status === "100") {
                    toast({
                      duration: 1000,
                      description: resp.data.message,
                    });
                    onSubmit("otp", phone);
                    setPhone("");
                  } else {
                    throw new Error(resp.data.message);
                  }
                },
              });
            }}
          >
            Selanjutnya
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
