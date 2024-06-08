import clsx from "clsx";
import Image from "next/image";

import type { ILastTrx } from "@/api/useLandingPage";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isLoading: boolean;
  trx: ILastTrx[];
};

export default function Transactions({ isLoading, trx }: Props) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-2.5">
        <label className="text-sm md:text-base font-semibold text-grey-2">
          Transaksi terakhir di E-Ziswaf
        </label>

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
              <label className="text-xs font-semibold">
                TRX {data.trx_no.slice(0, 8)}
              </label>
              <label className="text-xs">
                dari <b>{data.from}</b> kepada <b>{data.to}</b>
              </label>
              <label className="text-xs">{data.time}</label>
            </div>
            <label className="text-xs text-green-1 font-semibold">
              {data.amount}
            </label>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        {trx.map((data, i) => (
          <div
            key={i}
            className={clsx({
              "py-2.5 px-4 flex justify-between": true,
              "bg-grey-3": i % 2 === 0,
              "bg-white": i % 2 !== 0,
            })}
          >
            <div className="flex items-center gap-4">
              <Image
                src="/icon/icon-wallet.svg"
                alt="icon-wallet"
                width={24}
                height={24}
              />
              <label className="ml-4 text-sm font-semibold">
                TRX {data.trx_no.slice(0, 8)}
              </label>
              <label className="text-sm">{data.time}</label>
              <label className="text-sm flex-1">
                dari <b>{data.from}</b> kepada <b>{data.to}</b>
              </label>
            </div>
            <div className="flex justify-end">
              <label className="text-sm text-green-1 font-semibold">
                {data.amount}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
