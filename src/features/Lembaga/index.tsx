"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import Pagination from "@/components/Pagination";
import { delimiter } from "@/utils/string";

import {
  useFetchAllLembagaWakaf,
  useFetchAllLembagaZakat,
} from "./hooks/useLembaga";

type Props = {
  type: "zakat" | "wakaf";
};

export default function Lembaga({ type }: Props) {
  const router = useRouter();

  const [page, setPage] = useState(0);

  const { data: lembagaZakat } = useFetchAllLembagaZakat(page, type);
  const { data: lembagaWakaf } = useFetchAllLembagaWakaf(page, type);

  const listLembaga = type === "zakat" ? lembagaZakat : lembagaWakaf;

  return (
    <div className="flex flex-col gap-5">
      <Label className="text-grey-2 md:text-2xl text-xl font-bold">
        Lembaga {type === "zakat" ? "Zakat" : "Wakaf"}
      </Label>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
        {listLembaga &&
          listLembaga.data.length > 0 &&
          listLembaga.data.map((item) => (
            <div
              key={item.kode}
              className="border border-grey-1 flex flex-col rounded-[10px] mb-1"
            >
              <div className="rounded-tl-[10px] rounded-tr-[10px] flex-1 flex flex-col items-center justify-center gap-2.5 bg-grey-3 p-4">
                <Image
                  src={
                    item.image
                      ? `https://api.eziswaf.net/v1/app/logo/${item.image}`
                      : "/icon/icon-placeholder-lembaga.svg"
                  }
                  alt={item.nama}
                  width={70}
                  height={70}
                  className="rounded-full border border-grey-1"
                />
                <a
                  className="text-sm font-semibold text-grey-2 text-center cursor-pointer hover:text-blue-1"
                  onClick={() => router.push(`/lembaga-${type}/${item.kode}`)}
                >
                  {item.nama}
                </a>
              </div>
              <div className="px-4 py-5 flex flex-col gap-5 rounded-bl-[10px] rounded-br-[10px]">
                <div className="flex gap-2 items-start">
                  <Image
                    src="/icon/icon-basket-light.svg"
                    alt="icon-basket-light"
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-grey-2">
                      Total Himpunan
                    </label>
                    <label className="text-xs md:text-sm font-semibold text-green-1">
                      Rp{delimiter(item.total)}
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <Image
                    src="/icon/icon-book-check-light.svg"
                    alt="icon-book-check-light"
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-grey-2">
                      Total Transaksi
                    </label>
                    <label className="text-xs md:text-sm font-semibold text-grey-2">
                      {item.trx}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {listLembaga && listLembaga?.data.length > 0 && (
        <Pagination
          page={page}
          totalPage={listLembaga.metadata.totalPage || 1}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
}
