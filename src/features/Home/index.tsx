"use client";

import Image from "next/image";

import useAppContext from "@/utils/context";

import Infographic from "./components/Infographic";
import LembagaSlider from "./components/LembagaSlider";
import Transactions from "./components/Transactions";
import { useFetchLandingData } from "./hooks/useLandingPage";

export default function Home() {
  const { isOpen } = useAppContext();

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
    <>
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

      <LembagaSlider isOpen={isOpen} type="zakat" />

      <LembagaSlider isOpen={isOpen} type="wakaf" />

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
    </>
  );
}
