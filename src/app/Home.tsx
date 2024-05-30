"use client";

import clsx from "clsx";
import Image from "next/image";
import Slider from "react-slick";

import { useFetchLandingData } from "@/api/useLandingPage";
import HeaderMobile from "@/components/HeaderMobile";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Infographic from "@/features/Home/components/Infographic";
import Transactions from "@/features/Home/components/Transactions";
import { MENU } from "@/utils/constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const data = useFetchLandingData();
  console.log(data);

  const mobile = window.innerWidth < 768;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: mobile ? 1.7 : 4,
    slidesToScroll: mobile ? 1 : 4,
    prevArrow: !mobile ? (
      <Image
        src={"/icon/icon-arrow-left.svg"}
        alt={"icon-arrow-left"}
        width={40}
        height={40}
      />
    ) : null,
    nextArrow: !mobile ? (
      <Image
        src={"/icon/icon-arrow-right.svg"}
        alt={"icon-arrow-right"}
        width={40}
        height={40}
      />
    ) : null,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: mobile ? 1.15 : 3,
    slidesToScroll: mobile ? 1 : 3,
    prevArrow: !mobile ? (
      <Image
        src={"/icon/icon-arrow-left.svg"}
        alt={"icon-arrow-left"}
        width={40}
        height={40}
      />
    ) : null,
    nextArrow: !mobile ? (
      <Image
        src={"/icon/icon-arrow-right.svg"}
        alt={"icon-arrow-right"}
        width={40}
        height={40}
      />
    ) : null,
  };

  return (
    <div className="relative bg-white md:overflow-x-hidden">
      <div className="md:hidden block">
        <HeaderMobile />
      </div>

      <main className="flex flex-col md:flex-row md:gap-5 pt-16 md:pt-0">
        <div
          className={clsx({
            "transition-all duration-1000 h-[800px] hidden bg-white w-[300px] p-5 md:flex flex-col":
              true,
            // "-left-80 w-80": false,
            // "left-0 w-80": open,
          })}
          style={{ boxShadow: "8px 0px 34px 0px #0000001A" }}
        >
          <div className="flex pb-5 justify-between border-b border-grey-1">
            <Image
              src="/logo-e-ziswaf.png"
              alt="logo e-ziswaf"
              width={153}
              height={40}
            />
          </div>
          <div className="pt-4 flex flex-col justify-between h-[calc(800px-60.5px)]">
            <div className="flex flex-col gap-2.5">
              {MENU.ziswaf.map((item) => (
                <div
                  key={item.title}
                  className={clsx({
                    "p-2.5 flex gap-2 items-center": true,
                    "rounded-[10px] bg-green-2": item.isActive,
                  })}
                >
                  <Image
                    src={`${item.icon}.svg`}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                  <span
                    className={clsx({
                      "font-medium": true,
                      "text-green-1": item.isActive,
                      "text-grey-2": !item.isActive,
                    })}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              {MENU.others.map((item) => (
                <div
                  key={item.title}
                  className={clsx({
                    "p-2.5 flex gap-2 items-center": true,
                    "rounded-[10px] bg-green-2": item.isActive,
                  })}
                >
                  <Image
                    src={`${item.icon}.svg`}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                  <span
                    className={clsx({
                      "font-medium": true,
                      "text-green-1": item.isActive,
                      "text-grey-2": !item.isActive,
                    })}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
              <Image
                src={"/icon/icon-arrow-left.svg"}
                alt={"icon-arrow-left"}
                width={44}
                height={44}
              />
            </div>
          </div>
        </div>

        <section className="min-w-0 flex flex-col p-4 flex-1 gap-4 md:gap-5">
          <div className="py-5 hidden md:flex justify-between border-b border-grey-1">
            <Input
              className="w-2/3"
              placeholder="Cari di Ziswaf"
              leftIcon={
                <Image
                  src="/icon/icon-search.svg"
                  alt="icon-search"
                  width={24}
                  height={24}
                  className="absolute left-3 top-2"
                />
              }
            />
            <div className="flex gap-2.5">
              <Button>Masuk</Button>
              <Button variant={"outline"}>Daftar</Button>
            </div>
          </div>

          {/* Banner */}
          <Image
            src="/banner.png"
            alt="banner"
            width="0"
            height={250}
            sizes="100%"
            className="w-full rounded-[10px]"
          />

          <Infographic />

          <Transactions />

          {/* Lembaga Zakat */}
          <div className="mb-3 min-w-0">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm md:text-base font-semibold text-grey-2">
                Lembaga Zakat Pilihan
              </label>

              <a className="text-xs md:text-sm text-blue-1 font-medium cursor-pointer">
                Lihat Semua
              </a>
            </div>
            <div className="min-w-0">
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
          </div>

          {/* Lembaga Wakaf */}
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

          {/* Masjid */}
          <div className="mb-3 min-w-0">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm md:text-base font-semibold text-grey-2">
                Masjid
              </label>

              <a className="text-xs md:text-sm text-blue-1 font-medium cursor-pointer">
                Lihat Semua
              </a>
            </div>
            <Slider {...settings2}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border border-grey-1 flex flex-col rounded-[10px]"
                >
                  <Image
                    src="/masjid.png"
                    alt="masjid"
                    width="0"
                    height={150}
                    sizes="100vw"
                    className="w-full rounded-tl-[10px] rounded-tr-[10px]"
                  />
                  <div className="px-4 py-5 flex flex-col gap-4 rounded-bl-[10px] rounded-br-[10px]">
                    <label className="text-grey-2 font-bold text-sm">
                      Masjid Assalam
                    </label>

                    <div className="flex gap-2 items-start">
                      <Image
                        src="/icon/icon-pin-light.svg"
                        alt="icon-pin-light"
                        width={24}
                        height={24}
                      />

                      <label className="text-[10px] text-grey-2">
                        Jl. Bukit Pamulang Indah No.A18, RW.8, Pamulang Tim.,
                        Kec. Pamulang, Kota Tangerang Selatan, Banten 15417
                      </label>
                    </div>

                    <div className="flex gap-2 items-start">
                      <Image
                        src="/icon/icon-box-light.svg"
                        alt="icon-box-light"
                        width={24}
                        height={24}
                      />

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-grey-2">
                          Total Amal
                        </label>
                        <label className="text-xs md:text-sm font-semibold text-green-1">
                          Rp50.000.000
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Program */}
          <div className="mb-3 min-w-0">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm md:text-base font-semibold text-grey-2">
                Program
              </label>

              <a className="text-xs md:text-sm text-blue-1 font-medium cursor-pointer">
                Lihat Semua
              </a>
            </div>
            <Slider {...settings2}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border border-grey-1 flex flex-col rounded-[10px]"
                >
                  <Image
                    src="/program.png"
                    alt="program"
                    width="0"
                    height={150}
                    sizes="100vw"
                    className="w-full rounded-tl-[10px] rounded-tr-[10px]"
                  />
                  <div className="px-4 py-5 flex flex-col border-b border-grey-1 gap-4 rounded-bl-[10px] rounded-br-[10px]">
                    <div className="flex items-center">
                      <label className="text-grey-2 text-xs">
                        Dompet Dhuafa
                      </label>
                      <Image
                        src="/icon/icon-check-ring.svg"
                        alt="icon-check-ring"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-grey-2 font-bold text-sm">
                        Bantu Lawan 2 Kerusakan Organ
                      </label>
                      <label className="text-xs font-medium text-blue-1">
                        #Kesehatan
                      </label>
                    </div>

                    <div className="flex flex-col gap-2.5 mt-2">
                      <div className="w-full h-1.5 rounded bg-grey-1">
                        <div className="w-1/2 h-1.5 rounded bg-green-1" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-grey-2">
                          Dana Terkumpul
                        </label>
                        <label className="text-xs md:text-sm font-semibold text-green-1">
                          Rp50.000.000
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
