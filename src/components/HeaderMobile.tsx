"use client";

import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MENU } from "@/utils/constant";

export default function HeaderMobile() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div
        className={clsx({
          "w-screen h-screen bg-black bg-opacity-50 fixed z-50": open,
        })}
      >
        <div
          className={clsx({
            "transition-all duration-1000 h-screen fixed z-20 bg-white min-w-[300px] flex flex-col":
              true,
            "-left-80 w-80": !open,
            "left-0 w-80": open,
          })}
        >
          <div className="flex py-3 px-4 justify-between border-b border-grey-1">
            <Image
              src="/logo-e-ziswaf.png"
              alt="logo e-ziswaf"
              width={153}
              height={40}
            />
            <Image
              src="/icon/icon-close.svg"
              alt="icon-close"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="px-5 py-4 flex flex-col justify-between h-[calc(100vh-64.5px)]">
            <div className="flex flex-col gap-2.5">
              {MENU.ziswaf.map((item) => (
                <div
                  key={item.title}
                  className={clsx({
                    "p-2.5 flex gap-2 items-center": true,
                    "rounded-[10px] bg-green-2": isActive(item.path),
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
                      "text-green-1": isActive(item.path),
                      "text-grey-2": !isActive(item.path),
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
                    "rounded-[10px] bg-green-2": isActive(item.path),
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
                      "text-green-1": isActive(item.path),
                      "text-grey-2": !isActive(item.path),
                    })}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className="fixed bg-white z-10 w-full flex justify-between py-3 px-4 border-b border-grey-1">
        <Image
          className="cursor-pointer"
          src="/icon/icon-menu.svg"
          alt="icon-menu"
          width={24}
          height={24}
          onClick={() => setOpen(!open)}
        />
        <Image
          className="ml-10"
          src="/logo-e-ziswaf.png"
          alt="logo e-ziswaf"
          width={153}
          height={40}
        />
        <div className="flex gap-4">
          <Image
            src="/icon/icon-search.svg"
            alt="icon-search"
            width={24}
            height={24}
          />
          <Image
            src="/icon/icon-user.svg"
            alt="icon-user"
            width={24}
            height={24}
          />
        </div>
      </header>
    </div>
  );
}
