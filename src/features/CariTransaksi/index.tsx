"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/Pagination";
import { delimiter } from "@/utils/string";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import { title } from "process";

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
    title: "Wakaf",
    icon: "/icon/icon-gift",
  },
  {
    value: "3",
    title: "Infak",
    icon: "/icon/icon-archive",
  },
];

const HEADER_TABLE = [
  {
    title: "No. Transaksi",
  },
  { title: "User ID", align: "text-left" },
  { title: "Ke Lembaga", align: "text-left" },
  { title: "Jumlah", align: "text-right" },
  { title: "Status" },
];

export default function CariTransaksi() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      <Label className="md:text-2xl text-xl font-bold">Cari Transaksi</Label>
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between">
          <Tabs
            defaultValue={activeTab}
            onValueChange={(val: string) => {
              setActiveTab(val);
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
                className={clsx("text-grey-4 py-4 font-semibold", item.align)}
              >
                {item.title}
              </th>
            ))}
          </thead>
          <tbody>
            <tr className="odd:bg-grey-3 even:bg-white">
              <td className="text-grey-2 p-4 text-center flex gap-2.5">
                <Image
                  src={`/icon/icon-wallet.svg`}
                  alt={"icon-wallet"}
                  width={24}
                  height={24}
                />
                TRX 0001
              </td>
              <td className="text-grey-2 py-4">USR0001</td>
              <td className="text-grey-2 py-4">Lembaga A</td>
              <td className="text-grey-2 py-4 text-right">
                Rp. {delimiter(100000)}
              </td>
              <td className="text-grey-2 py-4 text-center">Berhasil</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* {listLembaga && listLembaga?.data.length > 0 && (
        <Pagination
          page={page}
          totalPage={listLembaga.metadata.totalPage || 1}
          onPageChange={(page) => setPage(page)}
        />
      )} */}
    </div>
  );
}
