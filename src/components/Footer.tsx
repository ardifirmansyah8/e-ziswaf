"use client";

import clsx from "clsx";
import Image from "next/image";

import { Label } from "./ui/label";

type Props = { isOpen: boolean };

export default function Footer({ isOpen }: Props) {
  return (
    <footer className="px-4 py-5 md:py-[30px] bg-grey-3 w-full flex justify-center">
      <div className="md:w-[1280px] flex flex-col md:flex-row md:gap-5">
        <div
          className={clsx({
            "hidden md:block": true,
            "md:w-[300px]": isOpen,
            "md:w-[84px]": !isOpen,
          })}
        />
        <div
          className={clsx({
            "flex-1 flex flex-col md:flex-row gap-7 md:justify-between": true,
          })}
        >
          <div className="flex flex-col gap-4 md:ml-4 md:w-[304px]">
            <Image
              src="/logo-e-ziswaf.png"
              alt="logo e-ziswaf"
              width={108}
              height={28}
            />

            <div className="flex gap-2 items-start">
              <Image
                src="/icon/icon-pin-light.svg"
                alt="icon-pin-light"
                width={24}
                height={24}
              />

              <Label className="text-xs">
                DIGITALISASI & DATABASE TERINTEGRASI KEUANGAN SOSIAL SYARIAH
                NASIONAL
              </Label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">
                Berkolaborasi Dengan:
              </Label>
              <div className="flex gap-4">
                <Image
                  src="/footer/icon-masjed.svg"
                  alt="icon-masjed"
                  width={30}
                  height={30}
                />
                <Image
                  src="/footer/icon-artajasa.svg"
                  alt="icon-artajasa"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">
                Regulasi Keuangan Sosial Syariah:
              </Label>
              <div className="flex gap-4">
                <Image
                  src="/footer/icon-bi.svg"
                  alt="icon-bi"
                  width={95}
                  height={30}
                />
                <Image
                  src="/footer/icon-ikhlas-beramal.svg"
                  alt="icon-ikhlas-beramal"
                  width={33}
                  height={30}
                />
                <Image
                  src="/footer/icon-baznas.svg"
                  alt="icon-baznas"
                  width={39}
                  height={30}
                />
                <Image
                  src="/footer/icon-bwi.svg"
                  alt="icon-bwi"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">
                Organisasi Islam Nasional :
              </Label>
              <div className="flex gap-4">
                <Image
                  src="/footer/icon-nu.svg"
                  alt="icon-nu"
                  width={46}
                  height={30}
                />
                <Image
                  src="/footer/icon-muhammadiyah.svg"
                  alt="icon-muhammadiyah"
                  width={30}
                  height={30}
                />
                <Image
                  src="/footer/icon-komunitas.svg"
                  alt="icon-komunitas"
                  width={30}
                  height={30}
                />
                <Image
                  src="/footer/icon-fz.svg"
                  alt="icon-fz"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 md:mr-4">
            <Label className="text-xs font-medium">Ikuti kami di:</Label>
            <div className="flex gap-1">
              <Image
                src="/icon/icon-twitter.svg"
                alt="icon-twitter"
                width={30}
                height={30}
              />
              <Image
                src="/icon/icon-fb.svg"
                alt="icon-fb"
                width={30}
                height={30}
              />
              <Image
                src="/icon/icon-ig.svg"
                alt="icon-ig"
                width={30}
                height={30}
              />
              <Image
                src="/icon/icon-wa.svg"
                alt="icon-wa"
                width={30}
                height={30}
              />
              <Image
                src="/icon/icon-linkedin.svg"
                alt="icon-linkedin"
                width={30}
                height={30}
              />
              <Image
                src="/icon/icon-youtube.svg"
                alt="icon-youtube"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
