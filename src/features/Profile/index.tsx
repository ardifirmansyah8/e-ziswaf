"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
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
import { useFetchUserDashboard } from "./hooks/useProfile";

import "chart.js/auto";
import { Input } from "@/components/ui/input";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const { profile } = useAppContext();
  const { data: userDashboard } = useFetchUserDashboard();

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

  return (
    <div className="px-[76px] flex flex-col gap-7">
      <Card>
        <div className="flex gap-5">
          <Image
            width={90}
            height={90}
            src={"/icon/icon-placeholder-profile.svg"}
            alt="icon-placeholder-profile"
          />
          <div className="flex flex-col flex-1 gap-2.5">
            <Label className="text-grey-2 font-bold text-xl">
              {profile?.name || "Hamba Allah"}
            </Label>
            <Label className="text-grey-2 flex gap-1">
              <span className="w-6">NIK</span>
              <span>:</span>
              <span>{profile?.nik || "-"}</span>
            </Label>
            <Label className="text-grey-2 flex gap-1">
              <span className="w-6">ID</span>
              <span>:</span>
              <span className="flex-1">{profile?.nik || "-"}</span>
            </Label>
          </div>
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-xs"
            onClick={() => setIsOpen(true)}
          >
            Ubah Data
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-7 w-full">
          <div className="flex items-center justify-between">
            <Label className="text-grey-2 font-semibold text-base">
              Donasi Anda
            </Label>
            <div className="flex items-center gap-2.5">
              <Label className="text-grey-2">Tahun</Label>
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

          <div className="flex gap-4">
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
                <span className="text-grey-2">Total Zakat Anda</span>
                <span className="font-bold text-grey-2 text-lg">
                  Rp {delimiter(userDashboard?.dashboard?.zakat || 0)}
                </span>
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
                <span className="text-grey-2">Total Wakaf Anda</span>
                <span className="font-bold text-grey-2 text-lg">
                  Rp {delimiter(userDashboard?.dashboard?.wakaf || 0)}
                </span>
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
                <span className="text-grey-2">Total Infak Anda</span>
                <span className="font-bold text-grey-2 text-lg">
                  Rp {delimiter(userDashboard?.dashboard?.infak || 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-base font-semibold text-grey-2">
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
          <div className="flex items-center justify-between">
            <Label className="text-grey-2 font-semibold text-base">
              Transaksi Anda
            </Label>
            <div className="flex items-center gap-2.5">
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

          <div>
            {[...Array(6)].map((data, i) => (
              <div
                key={i}
                className={clsx({
                  "py-2.5 px-4 flex": true,
                  "bg-grey-3": i % 2 === 0,
                  "bg-white": i % 2 !== 0,
                })}
              >
                <div className="flex-1 flex items-center gap-4">
                  <Image
                    src="/icon/icon-wallet.svg"
                    alt="icon-wallet"
                    width={24}
                    height={24}
                  />
                  <Label className="text-sm font-semibold w-1/4">
                    TRX {"123456789".slice(0, 8)}
                  </Label>
                  <Label className="text-sm flex-1">Dompet Dhuafa</Label>
                </div>
                <div className="flex items-center justify-end gap-6">
                  <Label className="text-sm text-green-1 font-semibold">
                    Rp1.000
                  </Label>

                  <Button variant={"outline"}>Bukti Setor</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <UserDataDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        isProfile
        profile={profile}
      />
    </div>
  );
}
