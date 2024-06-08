"use client";

import Image from "next/image";
import { useState } from "react";

import { useFetchLandingData } from "@/api/useLandingPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeaderMobile from "@/components/HeaderMobile";
import Footer from "@/components/Footer";
import OtpDialog from "@/components/OtpDialog";
import Sidebar from "@/components/Sidebar";
import Infographic from "@/features/Home/components/Infographic";
import LembagaZakat from "@/features/Home/components/LembagaZakat";
import LembagaWakaf from "@/features/Home/components/LembagaWakaf";
import Transactions from "@/features/Home/components/Transactions";
import LoginDialog from "@/features/Login/components/LoginDialog";
import RegisterDialog from "@/features/Register/components/RegisterDialog";
import UserDataDialog from "@/features/Register/components/UserDataDialog";
import SuccessRegisterDialog from "@/features/Register/components/SuccessRegisterDialog";

export default function Home() {
  const jwt = window?.localStorage.getItem("jwt");
  console.log(jwt);

  const [isOpen, setIsOpen] = useState(true);
  const [dialogType, setDialogType] = useState("");
  const [backTo, setBackTo] = useState("");
  const [phone, setPhone] = useState("");

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
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

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
              {!jwt && (
                <div className="flex gap-2.5">
                  <Button onClick={() => setDialogType("login")}>Masuk</Button>
                  <Button
                    variant={"outline"}
                    onClick={() => setDialogType("register")}
                  >
                    Daftar
                  </Button>
                </div>
              )}
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

      <LoginDialog
        isOpen={dialogType === "login"}
        onClose={(type) => setDialogType(type || "")}
        onSubmit={(type: string) => {
          setBackTo("login");
          setDialogType(type);
        }}
      />

      <RegisterDialog
        isOpen={dialogType === "register"}
        onClose={(type) => setDialogType(type || "")}
        onSubmit={(type: string, phone: string) => {
          setBackTo("register");
          setPhone(phone);
          setDialogType(type);
        }}
      />

      <OtpDialog
        isOpen={dialogType === "otp"}
        backTo={backTo}
        phone={phone}
        onClose={(type: string) => setDialogType(type)}
        onSubmit={() => {
          if (backTo === "login") {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            setDialogType("user-data");
          }
        }}
      />

      <UserDataDialog
        isOpen={dialogType === "user-data"}
        onSubmit={() => {
          setDialogType("success-register");
        }}
      />

      <SuccessRegisterDialog isOpen={dialogType === "success-register"} />
    </div>
  );
}
