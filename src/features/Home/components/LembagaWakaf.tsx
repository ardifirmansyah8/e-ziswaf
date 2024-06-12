"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

import { useFetchLembagaWakaf } from "@/api/useLandingPage";
import WrapperArrow from "@/components/WrapperArrow";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { delimiter } from "@/utils/string";

type Props = {
  isOpen: boolean;
};

export default function LembagaWakaf({ isOpen }: Props) {
  const router = useRouter();
  const { data } = useFetchLembagaWakaf();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isOpen ? 4 : 5,
    slidesToScroll: isOpen ? 4 : 5,
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
      <div className="min-w-0">
        <Slider {...settings}>
          {data?.map((item, i) => (
            <div
              key={i}
              className="border border-grey-1 flex flex-col rounded-[10px] mb-1"
            >
              <div className="rounded-tl-[10px] rounded-tr-[10px] h-[137px] flex flex-col items-center justify-center gap-2.5 bg-grey-3 p-4">
                <Image
                  src={`https://api.eziswaf.net/v1/app/logo/${item.image}`}
                  alt={item.nama}
                  width={70}
                  height={70}
                  className="rounded-full border border-grey-1"
                />
                <a
                  className="text-sm font-semibold text-grey-2 text-center cursor-pointer hover:text-blue-1"
                  onClick={() => router.push(`/lembaga/${item.kode}`)}
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
                    <label className="text-[10px] text-grey-2">
                      Total Himpunan
                    </label>
                    <label className="text-xs md:text-sm font-semibold text-green-1">
                      Rp{delimiter(item.total)}
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
                      {item.trx}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
