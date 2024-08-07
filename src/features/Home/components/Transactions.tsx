import clsx from "clsx";
import Image from "next/image";

import type { ILastTrx } from "@/features/Home/hooks/useLandingPage";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { TRX_TYPE_ICON } from "@/utils/constant";

type Props = {
  isLoading: boolean;
  trx: ILastTrx[];
};

export default function Transactions({ isLoading, trx }: Props) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-2.5">
        <Label className="text-sm md:text-base font-semibold">
          Transaksi terakhir di E-Ziswaf
        </Label>

        {!isLoading && (
          <a className="text-xs md:text-sm text-blue-1 font-medium cursor-pointer">
            Lihat Semua
          </a>
        )}
      </div>

      {isLoading && <Skeleton className="h-12 w-full" />}

      <div className="sm:block md:hidden">
        {trx.map((data, i) => (
          <div
            key={i}
            className={clsx({
              "p-2.5 flex gap-2.5 items-start": true,
              "bg-grey-3": i % 2 === 0,
              "bg-white": i % 2 !== 0,
            })}
          >
            <Image
              src="/icon/icon-wallet.svg"
              alt="icon-wallet"
              width={24}
              height={24}
            />
            <div className="flex flex-col gap-1 flex-1">
              <Label className="text-xs font-semibold">
                TRX {data.trx_no.slice(0, 8)}
              </Label>
              <Label className="text-xs">
                <b>{data.jenis}</b> dari <b>{data.from}</b> kepada{" "}
                <b>{data.to}</b>
              </Label>
              <Label className="text-xs">{data.time}</Label>
            </div>
            <Label className="text-xs text-green-1 font-semibold">
              {data.amount}
            </Label>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        {trx.map((data, i) => (
          <div
            key={i}
            className={clsx({
              "py-2.5 px-4 flex": true,
              "bg-grey-3": i % 2 === 0,
              "bg-white": i % 2 !== 0,
            })}
          >
            <div className="flex items-center gap-4 w-3/4">
              <Image
                src={TRX_TYPE_ICON[data.jenis as keyof typeof TRX_TYPE_ICON]}
                alt="icon-wallet"
                width={24}
                height={24}
              />
              <Label className="ml-4 text-sm font-semibold w-1/6">
                TRX {data.trx_no.slice(0, 8)}
              </Label>
              <Label className="text-sm w-[100px]">{data.time}</Label>
              <Label className="text-sm flex-1">
                <b>{data.jenis}</b> dari <b>{data.from}</b> kepada{" "}
                <b>{data.to}</b>
              </Label>
            </div>
            <div className="flex justify-end w-1/4">
              <Label className="text-sm text-green-1 font-semibold">
                {data.amount}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
