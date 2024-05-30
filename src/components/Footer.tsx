"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-4 py-5 md:py-[30px] bg-grey-3 w-full flex flex-col md:flex-row gap-7 md:gap-5">
      <div className="hidden md:block w-[300px]" />
      <div className="flex flex-col gap-4 md:w-[304px]">
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

          <label className="text-xs text-grey-2">
            Jl. Gandaria Tengah VII GD 15, Jl. Metland Transyogi No.56, Cipenjo,
            Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-grey-2">
            Berkolaborasi Dengan:
          </label>
          <div className="flex gap-4">
            <Image
              src="/footer/icon-artajasa.svg"
              alt="icon-artajasa"
              width={30}
              height={30}
            />
            <Image
              src="/footer/icon-masjed.svg"
              alt="icon-masjed"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-grey-2">
            Supported By:
          </label>
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
          <label className="text-xs font-medium text-grey-2">
            Rekan Komunitas:
          </label>
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
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-medium text-grey-2">
          Ikuti kami di:
        </label>
        <div className="flex gap-1">
          <Image
            src="/footer/icon-twitter.svg"
            alt="icon-twitter"
            width={30}
            height={30}
          />
          <Image
            src="/footer/icon-fb.svg"
            alt="icon-fb"
            width={30}
            height={30}
          />
          <Image
            src="/footer/icon-ig.svg"
            alt="icon-ig"
            width={30}
            height={30}
          />
          <Image
            src="/footer/icon-wa.svg"
            alt="icon-wa"
            width={30}
            height={30}
          />
          <Image
            src="/footer/icon-linkedin.svg"
            alt="icon-linkedin"
            width={30}
            height={30}
          />
          <Image
            src="/footer/icon-youtube.svg"
            alt="icon-youtube"
            width={30}
            height={30}
          />
        </div>
      </div>
    </footer>
  );
}
