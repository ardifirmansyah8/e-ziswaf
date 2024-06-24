import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type Props = {
  isOpen: boolean;
};

export default function SuccessRegisterDialog({ isOpen }: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="px-24 py-7 w-[430px]" close={false}>
        <div className="flex flex-col items-center justify-center gap-7">
          <Image
            width={100}
            height={100}
            src={"/logo-check.png"}
            alt="logo-check"
          />
          <Label className="text-base text-grey-2 text-center">
            Akun Anda berhasil dibuat selamat datang di
          </Label>
          <Image
            width={152}
            height={40}
            src={"/logo-e-ziswaf.png"}
            alt="logo-check"
          />
          <Button variant={"outline"} onClick={() => window.location.reload()}>
            Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
