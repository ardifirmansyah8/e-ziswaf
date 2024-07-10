"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAppContext from "@/utils/context";
import { delimiter } from "@/utils/string";

import UserDataDialog from "./components/UserDataDialog";
import { useFetchUserDashboard, useFetchUserTrx } from "./hooks/useProfile";

import "chart.js/auto";
import Pagination from "@/components/Pagination";
import TrxDetailDialog from "./components/TrxDetailDialog";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

export default function Profile() {
  const [dialog, setDialog] = useState("");
  const [trxNo, setTrxNo] = useState("");
  const [page, setPage] = useState(0);

  const { profile } = useAppContext();
  const { data: userDashboard } = useFetchUserDashboard();
  const { data: userTrx, refetch } = useFetchUserTrx(page);

  const chartData = useMemo(() => {
    const data = {
      zakat: [] as number[],
      infak: [] as number[],
      total: [] as number[],
      mnth: [] as string[],
      wakaf: [] as number[],
    };
    if (userDashboard && userDashboard.chart.length > 0) {
      userDashboard?.chart.forEach((item) => {
        data.mnth.push(item.mnth);
        data.total.push(item.total);
        data.zakat.push(item.zakat);
        data.wakaf.push(item.wakaf);
        data.infak.push(item.infak);
      });
    }
    return {
      labels: data.mnth,
      datasets: [
        {
          label: "Semua",
          data: data.total,
          fill: false,
          backgroundColor: "#45AF63",
          borderColor: "#45AF63",
          borderRadius: "50%",
          tension: 0.1,
        },
        {
          label: "Zakat",
          data: data.zakat,
          fill: false,
          backgroundColor: "#4169E1",
          borderColor: "#4169E1",
          borderRadius: "50%",
          tension: 0.1,
        },
        {
          label: "Infaq",
          data: data.infak,
          fill: false,
          backgroundColor: "#FF4F79",
          borderColor: "#FF4F79",
          borderRadius: "50%",
          tension: 0.1,
        },
        {
          label: "Wakaf",
          data: data.wakaf,
          fill: false,
          backgroundColor: "#FFBE0A",
          borderColor: "#FFBE0A",
          tension: 0.1,
        },
      ],
    };
  }, [userDashboard]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="md:px-[76px] flex flex-col gap-4 md:gap-7">
      <Card>
        <div className="flex items-start gap-5">
          <Image
            width={70}
            height={70}
            className="md:hidden"
            src={"/icon/icon-placeholder-profile.svg"}
            alt="icon-placeholder-profile"
          />
          <Image
            width={90}
            height={90}
            className="hidden md:block"
            src={"/icon/icon-placeholder-profile.svg"}
            alt="icon-placeholder-profile"
          />
          <div className="flex flex-col md:flex-1 gap-2.5">
            <Label className="font-bold text-xl">
              {profile?.name || "Hamba Allah"}
            </Label>
            <Label className="flex gap-1">
              <Label className="w-6">NIK</Label>
              <Label>:</Label>
              <Label>{profile?.nik || "-"}</Label>
            </Label>
            <Label className="flex gap-1">
              <Label className="w-6">ID</Label>
              <Label>:</Label>
              <Label className="flex-1 leading-relaxed">
                {profile?.id || "-"}
              </Label>
            </Label>
            <Button
              variant={"outline"}
              size={"sm"}
              className="text-xs md:hidden w-fit"
              onClick={() => setDialog("user-data")}
            >
              Ubah Data
            </Button>
          </div>
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-xs hidden md:block"
            onClick={() => setDialog("user-data")}
          >
            Ubah Data
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:gap-7 w-full">
          <div className="flex items-center justify-between">
            <Label className="font-semibold text-base">Donasi Anda</Label>
            <div className="flex items-center gap-2.5">
              <Label>Tahun</Label>
              <Select value="2024">
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div
              className={`rounded-[10px] p-2 flex-1 flex items-center gap-2.5 bg-[#DEEFFC]`}
            >
              <Image
                src={"/icon/icon-wallet.svg"}
                alt="icon"
                width={24}
                height={24}
              />
              <div className="flex flex-col gap-1">
                <Label>Total Zakat Anda</Label>
                <Label className="font-bold text-lg">
                  Rp {delimiter(userDashboard?.dashboard?.zakat || 0)}
                </Label>
              </div>
            </div>

            <div
              className={`rounded-[10px] p-4 flex-1 flex items-center gap-2.5 bg-[#FCE3DE]`}
            >
              <Image
                src={"/icon/icon-gift.svg"}
                alt="icon"
                width={24}
                height={24}
              />
              <div className="flex flex-col gap-1">
                <Label>Total Wakaf Anda</Label>
                <Label className="font-bold text-lg">
                  Rp {delimiter(userDashboard?.dashboard?.wakaf || 0)}
                </Label>
              </div>
            </div>

            <div
              className={`rounded-[10px] p-4 flex-1 flex items-center gap-2.5 bg-[#F5F2B1]`}
            >
              <Image
                src={"/icon/icon-archive.svg"}
                alt="icon"
                width={24}
                height={24}
              />
              <div className="flex flex-col gap-1">
                <Label>Total Infak Anda</Label>
                <Label className="font-bold text-lg">
                  Rp {delimiter(userDashboard?.dashboard?.infak || 0)}
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-base font-semibold">
              Grafik total donasi tahun 2024
            </Label>

            <div className="p-3.5 w-full border rounded-[10px] border-grey-1">
              <Chart
                type="line"
                data={chartData}
                width="100%"
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      align: "end",
                      labels: {
                        usePointStyle: true,
                        boxHeight: 5,
                      },
                      onClick: (_, legendItem, legend) => {
                        const datasetIndex = legendItem.datasetIndex as number;
                        legend.chart.getDatasetMeta(datasetIndex).hidden =
                          !legendItem.hidden;
                        legend.chart.update();
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between">
            <Label className="font-semibold text-base">Transaksi Anda</Label>
            {userTrx && userTrx?.data.length > 0 && (
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
            )}
          </div>

          <div className="mb-2">
            {userTrx && userTrx?.data.length === 0 && (
              <div className="text-center pt-4">
                <Label>Belum ada data transaksi</Label>
              </div>
            )}
            {userTrx &&
              userTrx?.data.length > 0 &&
              userTrx.data.map((data, i) => (
                <div key={i}>
                  <div
                    className={clsx({
                      "py-2.5 px-4 justify-between hover:bg-grey-1 cursor-pointer hidden md:flex":
                        true,
                      "bg-grey-3": i % 2 === 0,
                      "bg-white": i % 2 !== 0,
                    })}
                    onClick={() => {
                      setDialog("trx-detail");
                      setTrxNo(data.trx_no);
                    }}
                  >
                    <div className="flex-1 flex justify-between items-center gap-4">
                      <Image
                        src="/icon/icon-wallet.svg"
                        alt="icon-wallet"
                        width={24}
                        height={24}
                      />
                      <Label className="text-sm font-semibold">
                        TRX {data.trx_no.slice(0, 8)}
                      </Label>
                      <Label className="text-sm flex-1">{data.jenis}</Label>
                      <Label className="text-sm flex-1">{data.to}</Label>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <Label className="text-sm text-green-1 font-semibold">
                        {data?.amount}
                      </Label>

                      <Button
                        variant={"outline"}
                        className="flex items-center justify-between"
                        onClick={() =>
                          window.open(
                            `https://api.eziswaf.net/v1/app/download/${data.trx_no}.pdf`,
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
                  </div>
                  <div
                    className={clsx({
                      "py-2.5 px-4 hover:bg-grey-1 cursor-pointer flex gap-2.5 md:hidden":
                        true,
                      "bg-grey-3": i % 2 === 0,
                      "bg-white": i % 2 !== 0,
                    })}
                    onClick={() => {
                      setDialog("trx-detail");
                      setTrxNo(data.trx_no);
                    }}
                  >
                    <Image
                      src="/icon/icon-wallet.svg"
                      alt="icon-wallet"
                      width={24}
                      height={24}
                    />
                    <div className="flex flex-col gap-2.5">
                      <Label className="text-sm font-semibold">
                        TRX {data.trx_no.slice(0, 8)}
                      </Label>
                      <Label className="text-sm">{data.to}</Label>
                      <Label className="text-sm text-green-1 font-semibold">
                        {data?.amount}
                      </Label>
                      <Button
                        variant={"outline"}
                        className="flex items-center justify-between w-fit gap-2.5"
                        onClick={() =>
                          window.open(
                            `https://api.eziswaf.net/v1/app/download/${data.trx_no}.pdf`,
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
                  </div>
                </div>
              ))}
          </div>
        </div>

        {userTrx && userTrx?.data.length > 0 && (
          <Pagination
            page={page}
            totalPage={userTrx.metadata.totalPage}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </Card>

      <UserDataDialog
        isOpen={dialog === "user-data"}
        onClose={() => {
          setDialog("");
        }}
        isProfile
        profile={profile}
      />

      <TrxDetailDialog
        isOpen={dialog === "trx-detail"}
        trxNo={trxNo}
        onClose={() => {
          setDialog("");
        }}
      />
    </div>
  );
}
