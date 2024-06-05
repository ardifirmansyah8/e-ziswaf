"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import { useFetchLandingData } from "@/api/useLandingPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeaderMobile from "@/components/HeaderMobile";
import Footer from "@/components/Footer";
import Infographic from "@/features/Home/components/Infographic";
import LembagaZakat from "@/features/Home/components/LembagaZakat";
import LembagaWakaf from "@/features/Home/components/LembagaWakaf";
import Transactions from "@/features/Home/components/Transactions";
import { MENU } from "@/utils/constants";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  const { data, isLoading } = useFetchLandingData();

  // const settings2 = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: mobile ? 1.15 : 3,
  //   slidesToScroll: mobile ? 1 : 3,
  //   arrows: !mobile,
  //   prevArrow: !mobile ? (
  //     <WrapperArrow>
  //       <Image
  //         src={"/icon/icon-arrow-left.svg"}
  //         alt={"icon-arrow-left"}
  //         width={40}
  //         height={40}
  //       />
  //     </WrapperArrow>
  //   ) : undefined,
  //   nextArrow: !mobile ? (
  //     <WrapperArrow>
  //       <Image
  //         src={"/icon/icon-arrow-right.svg"}
  //         alt={"icon-arrow-right"}
  //         width={40}
  //         height={40}
  //       />
  //     </WrapperArrow>
  //   ) : undefined,
  // };

  return (
    <div className="bg-white md:flex md:flex-col md:items-center">
      <div className="md:w-[1280px]">
        <div className="md:hidden block">
          <HeaderMobile />
        </div>

        <main className="flex flex-col md:flex-row md:gap-5 pt-16 md:pt-0 w-full">
          <div
            className={clsx({
              "transition-all duration-1000 h-[800px] hidden bg-white w-[300px] p-5 md:flex flex-col":
                true,
              "w-[84px]": !isOpen,
              "w-[300px]": isOpen,
            })}
            style={{ boxShadow: "8px 0px 34px 0px #0000001A" }}
          >
            <div className="flex pb-5 justify-between border-b border-grey-1">
              {isOpen ? (
                <Image
                  src="/logo-e-ziswaf.png"
                  alt="logo e-ziswaf"
                  width={153}
                  height={40}
                />
              ) : (
                <Image
                  src="/icon-e-ziswaf.svg"
                  alt="icon e-ziswaf"
                  width={40}
                  height={40}
                />
              )}
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
                    {isOpen && (
                      <span
                        className={clsx({
                          "font-medium": true,
                          "text-green-1": item.isActive,
                          "text-grey-2": !item.isActive,
                        })}
                      >
                        {item.title}
                      </span>
                    )}
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
                    {isOpen && (
                      <span
                        className={clsx({
                          "font-medium": true,
                          "text-green-1": item.isActive,
                          "text-grey-2": !item.isActive,
                        })}
                      >
                        {item.title}
                      </span>
                    )}
                  </div>
                ))}
                <Image
                  src={
                    isOpen
                      ? "/icon/icon-arrow-left.svg"
                      : "/icon/icon-arrow-right.svg"
                  }
                  alt={"icon-arrow-left"}
                  width={44}
                  height={44}
                  className="cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </div>
          </div>

          <section className="min-w-0 flex flex-col p-4 flex-1 gap-4 md:gap-5">
            <div className="pt-1 pb-5 hidden md:flex justify-between border-b border-grey-1">
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

            <Infographic
              dashboard={
                data?.dashboard || {
                  ledger: 0,
                  infak: 0,
                  total_trx: 0,
                  total_user: 0,
                  wakaf: 0,
                  zakat: 0,
                }
              }
              chart={data?.chart || []}
            />

            <Transactions isLoading={isLoading} trx={data?.lastTrx || []} />

            <LembagaZakat isOpen={isOpen} />

            <LembagaWakaf />
            {/* Masjid */}
            {/* <div className="mb-3 min-w-0">
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
            </div> */}

            {/* Program */}
            {/* <div className="mb-3 min-w-0">
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
            </div> */}
          </section>
        </main>
      </div>
      <Footer isOpen={isOpen} />
    </div>
  );
}
