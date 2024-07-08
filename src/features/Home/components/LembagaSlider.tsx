"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import { Label } from "@/components/ui/label";
import WrapperArrow from "@/components/WrapperArrow";
import {
  useFetchLembagaWakaf,
  useFetchLembagaZakat,
} from "@/features/Home/hooks/useLandingPage";
import { delimiter } from "@/utils/string";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  isOpen: boolean;
  type: "zakat" | "wakaf";
};

export default function LembagaSlider({ isOpen, type }: Props) {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  const { data: lembagaZakat, isLoading: isLoadingZakat } =
    useFetchLembagaZakat(type);
  const { data: lembagaWakaf, isLoading: isLoadingWakaf } =
    useFetchLembagaWakaf(type);

  const dataLembaga = type === "zakat" ? lembagaZakat : lembagaWakaf;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1.7 : isOpen ? 4 : 5,
    slidesToScroll: isMobile ? 1 : isOpen ? 4 : 5,
    arrows: !isMobile,
    ...(!isMobile && {
      prevArrow: (
        <WrapperArrow>
          <Image
            src={"/icon/icon-arrow-left.svg"}
            alt={"icon-arrow-left"}
            width={40}
            height={40}
          />
        </WrapperArrow>
      ),
      nextArrow: (
        <WrapperArrow>
          <Image
            src={"/icon/icon-arrow-right.svg"}
            alt={"icon-arrow-right"}
            width={40}
            height={40}
          />
        </WrapperArrow>
      ),
    }),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.7,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="mb-3 min-w-0">
      <div className="flex justify-between items-center mb-2.5">
        <Label className="text-sm md:text-base font-semibold">
          Lembaga {type.toUpperCase()} Pilihan
        </Label>

        <a
          className="text-xs md:text-sm text-blue-1 font-medium cursor-pointer"
          onClick={() => router.push(`/lembaga-${type}`)}
        >
          Lihat Semua
        </a>
      </div>
      <div className="min-w-0">
        {(!isLoadingZakat || !isLoadingZakat) && (
          <Slider {...settings}>
            {dataLembaga?.map((item, i) => (
              <div
                key={i}
                className="border border-grey-1 flex flex-col rounded-[10px] mb-1"
              >
                <div className="rounded-tl-[10px] rounded-tr-[10px] h-[137px] flex flex-col items-center justify-center gap-2.5 bg-grey-3 p-4">
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
                    className="text-sm font-semibold text-center cursor-pointer hover:text-blue-1"
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
                      <Label className="text-[10px]">Total Himpunan</Label>
                      <Label className="text-xs md:text-sm font-semibold text-green-1">
                        Rp{delimiter(item.total)}
                      </Label>
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
                        Total Program
                      </label>
                      <label className="text-xs md:text-sm font-semibold text-grey-2">
                        {item.trx}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
