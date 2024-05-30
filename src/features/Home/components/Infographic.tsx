"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { delimiter } from "@/utils/string";

import "chart.js/auto";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

const grafikData = [
  {
    title: "Total Himpunan",
    value: 400000000,
    icon: "/icon/icon-basket.svg",
    color: "bg-green-2",
    type: "price",
  },
  {
    title: "Total Transaksi",
    value: 100000,
    icon: "/icon/icon-paper.svg",
    color: "bg-[#ECD5EE]",
    type: "quantity",
  },
  {
    title: "Total Donatur",
    value: 100000,
    icon: "/icon/icon-scan.svg",
    color: "bg-[#BDE9F3]",
    type: "quantity",
  },
  {
    title: "Total Zakat",
    value: 200000000,
    icon: "/icon/icon-wallet.svg",
    color: "bg-[#DEEFFC]",
    type: "price",
  },
  {
    title: "Total Wakaf",
    value: 100000000,
    icon: "/icon/icon-gift.svg",
    color: "bg-[#FCE3DE]",
    type: "price",
  },
  {
    title: "Total Infaq",
    value: 100000000,
    icon: "/icon/icon-archive.svg",
    color: "bg-[#F5F2B1]",
    type: "price",
  },
];

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Semua",
      data: [0.6, 0.7, 0.8, 1, 1.5],
      fill: false,
      backgroundColor: "#45AF63",
      borderColor: "#45AF63",
      borderRadius: "50%",
      tension: 0.1,
    },
    {
      label: "Zakat",
      data: [0.6, 0.9, 1.1, 1.3, 1.5],
      fill: false,
      backgroundColor: "#4169E1",
      borderColor: "#4169E1",
      borderRadius: "50%",
      tension: 0.1,
    },
    {
      label: "Infaq",
      data: [0.6, 0.9, 1.1, 1.3, 1.4],
      fill: false,
      backgroundColor: "#FF4F79",
      borderColor: "#FF4F79",
      borderRadius: "50%",
      tension: 0.1,
    },
    {
      label: "Wakaf",
      data: [0.6, 0.8, 1, 2, 3],
      fill: false,
      backgroundColor: "#FFBE0A",
      borderColor: "#FFBE0A",
      tension: 0.1,
    },
  ],
};

export default function Infographic() {
  return (
    <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 mb-3">
      <div className="grid grid-cols-2 md:grid-cols-3 md:w-2/3 gap-4">
        {grafikData.map((el) => (
          <div
            key={el.title}
            className={`rounded-[10px] p-2 md:p-5 flex items-center gap-2.5 md:gap-5 ${el.color}`}
          >
            <Image src={el.icon} alt="icon" width={24} height={24} />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-2">{el.title}</span>
              <span className="font-bold text-grey-2 text-xs md:text-sm">{`${
                el.type === "price" ? "Rp " : ""
              }${delimiter(el.value)}`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 w-full md:w-1/3 border rounded-[10px] border-grey-1">
        <Chart
          type="line"
          data={data}
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
