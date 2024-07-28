"use client";

import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/Pagination";
import { TRX_TYPE_ICON } from "@/utils/constant";

import { useFetchTransactions } from "./hooks/useTransactions";

const TABS_DATA = [
  {
    value: "all",
    title: "Semua",
    icon: "",
  },
  {
    value: "1",
    title: "Zakat",
    icon: "/icon/zakat",
  },
  {
    value: "2",
    title: "Infak",
    icon: "/icon/infaq",
  },
  {
    value: "3",
    title: "Wakaf",
    icon: "/icon/wakaf",
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
        <div className="flex flex-col gap-2.5 md:gap-0 md:flex-row md:justify-between">
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
                          ? `${item.icon}-green`
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

        <table className="md:table hidden">
          <thead className="bg-grey-1 py-4">
            <tr>
              {HEADER_TABLE.map((item) => (
                <th
                  key={item.title}
                  className={clsx("text-grey-4 p-4 font-semibold", item.align)}
                >
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trxData?.data.map((item) => (
              <tr key={item.trx_no} className="odd:bg-grey-3 even:bg-white">
                <td className="text-grey-2 p-4 text-center flex gap-2.5">
                  <Image
                    src={
                      TRX_TYPE_ICON[item.jenis as keyof typeof TRX_TYPE_ICON]
                    }
                    alt={item.jenis}
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

        <div className="md:hidden">
          {trxData?.data.map((item) => (
            <div
              key={item.trx_no}
              className="odd:bg-grey-3 even:bg-white flex flex-col gap-2.5 p-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={TRX_TYPE_ICON[item.jenis as keyof typeof TRX_TYPE_ICON]}
                  alt={item.jenis}
                  width={24}
                  height={24}
                />
                <Label className="font-semibold">
                  TRX {item.trx_no.slice(0, 8)}
                </Label>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex">
                  <Label className="w-24">User ID</Label>
                  <Label>
                    {item.from === "Hamba Allah"
                      ? "Hamba Allah"
                      : item.from.slice(0, 8)}
                  </Label>
                </div>
                <div className="flex">
                  <Label className="w-24">Ke Lembaga</Label>
                  <Label>{item.to}</Label>
                </div>
                <div className="flex">
                  <Label className="w-24">Tanggal</Label>
                  <Label>{format(new Date(item.tanggal), "dd MMM yyyy")}</Label>
                </div>
                <div className="flex">
                  <Label className="w-24">Jumlah</Label>
                  <Label>{item.amount}</Label>
                </div>
              </div>
            </div>
          ))}
        </div>
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
