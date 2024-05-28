"use client";

import Image from "next/image";
import Slider from "react-slick";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Infographic from "@/features/Home/components/Infographic";
import Transactions from "@/features/Home/components/Transactions";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1.7,
  slidesToScroll: 1,
  arrows: false,
};

const settings2 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1.15,
  slidesToScroll: 1,
  arrows: false,
};

export default function Home() {
  return (
    <div className="relative">
      <Header />

      <main className="flex flex-col pt-16">
        <section className="flex flex-col justify-center p-4 w-full gap-4">
          {/* Banner */}
          <Image
            src="/banner.png"
            alt="banner"
            width="0"
            height={150}
            sizes="100vw"
            className="w-full"
          />

          <Infographic />

          <Transactions />

          {/* Lembaga Zakat */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm font-semibold text-grey-2">
                Lembaga Zakat Pilihan
              </label>

              <a className="text-xs text-blue-1 font-medium cursor-pointer">
                Lihat Semua
              </a>
            </div>
            <Slider {...settings}>
              {[...Array(5)].map((_, i) => (
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
                        <label className="text-xs font-semibold text-green-1">
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
                        <label className="text-xs font-semibold text-grey-2">
                          50
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Lembaga Wakaf */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm font-semibold text-grey-2">
                Lembaga Wakaf Pilihan
              </label>

              <a className="text-xs text-blue-1 font-medium cursor-pointer">
                Lihat Semua
              </a>
            </div>
            <Slider {...settings}>
              {[...Array(5)].map((_, i) => (
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
                        <label className="text-xs font-semibold text-green-1">
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
                        <label className="text-xs font-semibold text-grey-2">
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
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm font-semibold text-grey-2">
                Masjid
              </label>

              <a className="text-xs text-blue-1 font-medium cursor-pointer">
                Lihat Semua
              </a>
            </div>
            <Slider {...settings2}>
              {[...Array(5)].map((_, i) => (
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
                        <label className="text-xs font-semibold text-green-1">
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
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm font-semibold text-grey-2">
                Program
              </label>

              <a className="text-xs text-blue-1 font-medium cursor-pointer">
                Lihat Semua
              </a>
            </div>
            <Slider {...settings2}>
              {[...Array(5)].map((_, i) => (
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
                        <label className="text-xs font-semibold text-green-1">
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
