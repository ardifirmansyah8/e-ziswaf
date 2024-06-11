import { format } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useFetchTrxDetail } from "../hooks/useProfile";
import { delimiter } from "@/utils/string";

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
            <Label className="text-base text-grey-2">Detail Transaksi</Label>
            <X className="h-6 w-6 cursor-pointer" onClick={() => onClose()} />
          </div>
          <div className="p-7 flex flex-col gap-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <Label className="text-base text-grey-2">
                  NO TRX:{" "}
                  <span className="font-semibold">
                    {data?.trx_no.slice(0, 8)}
                  </span>
                </Label>
                <Label className="text-grey-2">
                  {format(data?.tanggal || new Date(), "dd/MM/yyy HH:mm")}
                </Label>
              </div>
              <Button
                variant={"outline"}
                className="flex items-center justify-between gap-2"
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
                src="/icon/icon-archive.svg"
                alt="icon-archive"
                width={24}
                height={24}
              />
              <div className="flex flex-col gap-1">
                <Label className="text-grey-2">{data?.tipe_donasi}</Label>
                <Label className="text-xl font-bold text-green-1">
                  Rp {delimiter(data?.amount || 0)}
                </Label>
              </div>
            </div>
            <div>
              <Label className="text-grey-2">
                Metode Pembayaran:{" "}
                <span className="font-semibold">{data?.ca}</span>
              </Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
