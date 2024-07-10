"use client";

import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/Pagination";

import { useFetchTransactions } from "./hooks/useTransactions";

export const TRX_TYPE_ICON = {
  ZAKAT: "/icon/icon-wallet.svg",
  "INFAK/SEDEKAH": "/icon/icon-archive.svg",
  WAKAF: "/icon/icon-gift.svg",
};

const TABS_DATA = [
  {
    value: "all",
    title: "Semua Transaksi",
    icon: "",
  },
  {
    value: "1",
    title: "Zakat",
    icon: "/icon/icon-wallet",
  },
  {
    value: "2",
    title: "Infak",
    icon: "/icon/icon-archive",
  },
  {
    value: "3",
    title: "Wakaf",
    icon: "/icon/icon-gift",
  },
];

const HEADER_TABLE = [
  {
    title: "No. Transaksi",
  },
  { title: "User ID", align: "text-left" },
  { title: "Ke Lembaga", align: "text-left" },
  { title: "Tanggal Transaksi" },
  { title: "Jumlah", align: "text-right" },
];

export default function CariTransaksi() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data: trxData } = useFetchTransactions(page, activeTab, search);

  return (
    <div className="flex flex-col gap-5">
      <Label className="md:text-2xl text-xl font-bold">Cari Transaksi</Label>
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between">
          <Tabs
            defaultValue={activeTab}
            onValueChange={(val: string) => {
              setActiveTab(val);
              setPage(0);
            }}
          >
            <TabsList className="bg-white p-0">
              {TABS_DATA.map((item) => (
                <TabsTrigger
                  key={item.value}
                  className={clsx({
                    "h-[40px] flex gap-2.5 border border-grey-5 py-2 px-4 !text-grey-2 rounded-sm mr-1.5":
                      true,
                    "border border-green-1 !bg-green-2 !text-green-1":
                      activeTab === item.value,
                  })}
                  value={item.value}
                >
                  {item.icon && (
                    <Image
                      src={`${
                        activeTab === item.value
                          ? `${item.icon}-light`
                          : item.icon
                      }.svg`}
                      alt={item.title}
                      width={24}
                      height={24}
                    />
                  )}
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div>
            <Input
              placeholder="No. transaksi"
              className="placeholder:grey-4"
              value={search}
              onChange={(e) => {
                setPage(0);
                setSearch(e.target.value);
              }}
              rightIcon={
                <Image
                  src="/icon/icon-search.svg"
                  alt="icon-search"
                  width={24}
                  height={24}
                  className="absolute right-3 top-2"
                />
              }
            />
          </div>
        </div>

        <table>
          <thead className="bg-grey-1 py-4">
            {HEADER_TABLE.map((item) => (
              <th
                key={item.title}
                className={clsx("text-grey-4 p-4 font-semibold", item.align)}
              >
                {item.title}
              </th>
            ))}
          </thead>
          <tbody>
            {trxData?.data.map((item) => (
              <tr key={item.trx_no} className="odd:bg-grey-3 even:bg-white">
                <td className="text-grey-2 p-4 text-center flex gap-2.5">
                  <Image
                    src={`/icon/icon-wallet.svg`}
                    alt={"icon-wallet"}
                    width={24}
                    height={24}
                  />
                  TRX {item.trx_no.slice(0, 8)}
                </td>
                <td className="text-grey-2 p-4">
                  {item.from === "Hamba Allah"
                    ? "Hamba Allah"
                    : item.from.slice(0, 8)}
                </td>
                <td className="text-grey-2 p-4">{item.to}</td>
                <td className="text-grey-2 p-4 text-center">
                  {format(new Date(item.tanggal), "dd MMM yyyy")}
                </td>
                <td className="text-grey-2 p-4 text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {trxData && trxData?.data.length > 0 && (
        <Pagination
          page={page}
          totalPage={trxData.metadata.totalPage}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
}
