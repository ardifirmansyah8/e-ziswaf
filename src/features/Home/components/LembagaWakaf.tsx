"use client";

import Image from "next/image";
import Slider from "react-slick";

import { useFetchLembagaWakaf } from "@/api/useLandingPage";
import WrapperArrow from "@/components/WrapperArrow";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: true,
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

export default function LembagaWakaf() {
  const { data } = useFetchLembagaWakaf();

  console.log(data);
  if (data?.length === 0) return null;

  return (
    <div className="mb-3 min-w-0">
      <div className="flex justify-between items-center mb-2.5">
        <label className="text-sm md:text-base font-semibold text-grey-2">
          Lembaga Wakaf Pilihan
        </label>

        <a className="text-xs md:text-sm text-blue-1 font-medium cursor-pointer">
          Lihat Semua
        </a>
      </div>
      <Slider {...settings}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border border-grey-1 flex flex-col rounded-[10px]"
          >
            <div className="rounded-tl-[10px] rounded-tr-[10px] h-[137px] flex flex-col items-center justify-center gap-2.5 bg-grey-3">
              <Image
                src="/icon-dompet-dhuafa.svg"
                alt="icon-dompet-dhuafa"
                width={70}
                height={70}
                className="rounded-full border border-grey-1"
              />
              <label className="text-sm font-semibold text-grey-2">
                Dompet Dhuafa
              </label>
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
                    Rp50.000.000
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
                    Total Program
                  </label>
                  <label className="text-xs md:text-sm font-semibold text-grey-2">
                    50
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
