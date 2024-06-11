"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";

import type { IChart, IDashboard } from "@/api/useLandingPage";
import { DASHBOARD_DATA } from "@/utils/constant";
import { delimiter } from "@/utils/string";

import "chart.js/auto";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

export type DashboardType =
  | "ledger"
  | "total_trx"
  | "total_user"
  | "zakat"
  | "wakaf"
  | "infak";

type Props = {
  dashboard: IDashboard;
  chart: IChart[];
};

export default function Infographic({ dashboard, chart }: Props) {
  const chartData = useMemo(() => {
    const data = {
      zakat: [] as number[],
      infak: [] as number[],
      total: [] as number[],
      mnth: [] as string[],
      wakaf: [] as number[],
    };
    if (chart?.length > 0) {
      chart.forEach((item) => {
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
  }, [chart]);

  return (
    <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 mb-3">
      <div className="grid grid-cols-2 md:grid-cols-3 md:w-2/3 gap-4">
        {DASHBOARD_DATA.map((el) => (
          <div
            key={el.title}
            className={`rounded-[10px] p-2 md:p-5 flex items-center gap-2.5 md:gap-5 ${el.color}`}
          >
            <Image src={el.icon} alt="icon" width={24} height={24} />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-2">{el.title}</span>
              <span className="font-bold text-grey-2 text-xs md:text-sm">
                {dashboard
                  ? `${
                      el.type === "ledger" || el.type === "total_user"
                        ? ""
                        : "Rp "
                    }${delimiter(dashboard[el.type as DashboardType])}`
                  : ""}
              </span>
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
  );
}
