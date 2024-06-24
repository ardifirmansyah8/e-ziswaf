"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";

import Card from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DASHBOARD_DATA } from "@/utils/constant";
import useAppContext from "@/utils/context";
import { delimiter } from "@/utils/string";

import { DashboardType } from "../Home/components/Infographic";
import {
  useFetchDashboardLembaga,
  useFetchProfileLembaga,
  useFetchUserPortofolio,
} from "./hooks/useDetailLembaga";

import "chart.js/auto";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

type Props = {
  code: string;
};

export default function DetailLembaga({ code }: Props) {
  const { profile } = useAppContext();

  const { data: profileLembaga } = useFetchProfileLembaga(code);
  const { data: dashboardLembaga } = useFetchDashboardLembaga(code);
  const { data: userPortofolio } = useFetchUserPortofolio(
    code,
    profile?.id || ""
  );

  const chartData = useMemo(() => {
    const data = {
      zakat: [] as number[],
      infak: [] as number[],
      total: [] as number[],
      mnth: [] as string[],
      wakaf: [] as number[],
    };
    if (dashboardLembaga && dashboardLembaga.chart.length > 0) {
      dashboardLembaga?.chart.forEach((item) => {
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
  }, [dashboardLembaga]);

  return (
    <div className="pt-2.5 md:pb-6 flex flex-col gap-7">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-5">
        <Card className="md:flex-1">
          <div className="flex md:flex-row flex-col gap-5 items-start">
            <Image
              width={120}
              height={120}
              src={
                profileLembaga?.image
                  ? `https://api.eziswaf.net/v1/app/logo/${profileLembaga?.image}`
                  : "/icon/icon-placeholder-lembaga.svg"
              }
              alt="icon-lembaga"
            />
            <div className="flex flex-col flex-1 gap-5">
              <Label className="text-grey-2 font-bold text-xl">
                {profileLembaga?.nama}
              </Label>
              <div className="flex flex-col gap-4">
                <Label className="text-grey-2 flex gap-1">
                  <span className="w-24 text-xs text-grey-4 font-medium">
                    Berdiri Sejak
                  </span>
                  <span>:</span>
                  <span>{profileLembaga?.tglLahir || "-"}</span>
                </Label>
                <Label className="text-grey-2 flex gap-1">
                  <span className="w-24 text-xs text-grey-4 font-medium">
                    Izin Laz
                  </span>
                  <span>:</span>
                  <span className="flex-1">
                    {profileLembaga?.noIzinLaz || "-"}
                  </span>
                </Label>
                <Label className="text-grey-2 flex gap-1">
                  <span className="w-24 text-xs text-grey-4 font-medium">
                    Izin LW
                  </span>
                  <span>:</span>
                  <span className="flex-1">
                    {profileLembaga?.noIzinLw || "-"}
                  </span>
                </Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-grey-4 text-xs font-medium">
                  Alamat:
                </Label>
                <Label className="text-grey-2 leading-5">
                  {profileLembaga?.alamat}
                </Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-grey-4 font-medium">
                  Social Media:
                </Label>
                <div className="flex gap-1">
                  <Image
                    src="/icon/icon-twitter.svg"
                    alt="icon-twitter"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icon/icon-fb.svg"
                    alt="icon-fb"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icon/icon-ig.svg"
                    alt="icon-ig"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icon/icon-wa.svg"
                    alt="icon-wa"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icon/icon-linkedin.svg"
                    alt="icon-linkedin"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icon/icon-youtube.svg"
                    alt="icon-youtube"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {profile?.id && (
          <Card
            className="md:w-1/3 bg-green-1 p-11 bg-cover"
            style={{ backgroundImage: "url('/bg-portofolio.png')" }}
          >
            <div className="flex flex-col justify-center gap-7">
              <div className="text-white font-semibold text-xl w-32">
                Total donasi Anda disini
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                  <Image
                    src="/icon/icon-wallet-white.svg"
                    alt="icon"
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-col gap-1">
                    <Label className="text-white font-medium">Zakat</Label>
                    <Label className="font-bold text-white text-base">
                      Rp {delimiter(userPortofolio?.[0]?.zakat || 0)}
                    </Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Image
                    src="/icon/icon-wallet-white.svg"
                    alt="icon"
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-col gap-1">
                    <Label className="text-white font-medium">Wakaf</Label>
                    <Label className="font-bold text-white text-base">
                      Rp {delimiter(userPortofolio?.[0]?.wakaf || 0)}
                    </Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Image
                    src="/icon/icon-wallet-white.svg"
                    alt="icon"
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-col gap-1">
                    <Label className="text-white font-medium">Infaq</Label>
                    <Label className="font-bold text-white text-base">
                      Rp {delimiter(userPortofolio?.[0]?.infak || 0)}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 mb-3">
        <div className="grid md:grid-cols-3 grid-cols-2 flex-1 gap-4">
          {DASHBOARD_DATA.map((el) => (
            <div
              key={el.title}
              className={`rounded-[10px] p-2 md:p-5 flex items-center gap-2.5 md:gap-5 ${el.color}`}
            >
              <Image src={el.icon} alt="icon" width={24} height={24} />
              <div className="flex flex-col gap-1">
                <Label className="text-[10px] text-grey-2">{el.title}</Label>
                <Label className="font-bold text-grey-2 text-xs md:text-sm">
                  {dashboardLembaga?.dashboard
                    ? `${
                        el.type === "ledger" || el.type === "total_user"
                          ? ""
                          : "Rp "
                      }${delimiter(
                        dashboardLembaga?.dashboard?.[el.type as DashboardType]
                      )}`
                    : ""}
                </Label>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 w-full md:w-1/3 border rounded-[10px] border-grey-1">
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
  );
}
