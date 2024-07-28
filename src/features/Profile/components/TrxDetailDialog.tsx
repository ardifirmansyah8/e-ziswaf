import { format } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useFetchTrxDetail } from "../hooks/useProfile";
import { delimiter } from "@/utils/string";
import { TRX_TYPE_ICON } from "@/utils/constant";

type Props = {
  isOpen: boolean;
  trxNo: string;
  onClose: () => void;
};

export default function TrxDetailDialog({ isOpen, trxNo, onClose }: Props) {
  const { data } = useFetchTrxDetail(trxNo);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-0" close={false}>
        <div>
          <div className="bg-grey-1 px-7 py-5 flex items-center justify-between rounded-tl-sm rounded-tr-sm">
            <Label className="text-base">Detail Transaksi</Label>
            <X className="h-6 w-6 cursor-pointer" onClick={() => onClose()} />
          </div>
          <div className="p-4 md:p-7 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
              <div className="flex flex-col gap-1">
                <Label className="text-base">
                  NO TRX:{" "}
                  <Label className="font-semibold">
                    {data?.trx_no.slice(0, 8)}
                  </Label>
                </Label>
                <Label>
                  {format(data?.tanggal || new Date(), "dd/MM/yyy HH:mm")}
                </Label>
              </div>
              <Button
                variant={"outline"}
                className="flex items-center justify-between gap-2 w-fit"
                onClick={() =>
                  window.open(
                    `https://api.eziswaf.net/v1/app/download/${data?.trx_no}.pdf`,
                    "_blank"
                  )
                }
              >
                <Label>Bukti Setor</Label>
                <Image
                  src="/icon/icon-download.svg"
                  alt="icon-download"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
            <div className="flex gap-2.5 items-center">
              <Image
                src={
                  TRX_TYPE_ICON[data?.tipe_donasi as keyof typeof TRX_TYPE_ICON]
                }
                alt="icon-archive"
                width={24}
                height={24}
              />
              <div className="flex flex-col gap-1">
                <Label>{data?.tipe_donasi}</Label>
                <Label className="text-xl font-bold text-green-1">
                  Rp {delimiter(data?.amount || 0)}
                </Label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1.5 md:gap-1">
              <Label>Metode Pembayaran:</Label>
              <Label className="font-semibold">{data?.ca}</Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
