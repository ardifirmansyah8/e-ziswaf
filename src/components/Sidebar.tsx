"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MENU } from "@/utils/constant";
import { Label } from "./ui/label";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return path === "/" ? pathname === path : pathname.includes(path);
  };

  return (
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
            src="/icon/icon-e-ziswaf.svg"
            alt="icon e-ziswaf"
            width={40}
            height={40}
          />
        )}
      </div>
      <div className="pt-4 flex flex-col justify-between h-[calc(800px-60.5px)]">
        <div className="flex flex-col gap-2.5">
          {MENU.ziswaf.map((item) => (
            <Link
              key={item.title}
              className={clsx({
                "p-2.5 flex gap-2 items-center cursor-pointer hover:bg-accent hover:rounded-[10px]":
                  true,
                "rounded-[10px] bg-green-2": isActive(item.path),
              })}
              href={item.path}
            >
              <Image
                src={`${
                  isActive(item.path) ? `${item.icon}-green` : item.icon
                }.svg`}
                alt={item.title}
                width={24}
                height={24}
              />
              {isOpen && (
                <Label
                  className={clsx({
                    "font-medium cursor-pointer": true,
                    "text-green-1": isActive(item.path),
                  })}
                >
                  {item.title}
                </Label>
              )}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {MENU.others.map((item) =>
            item.title === "Tunaikan" ? (
              <Link
                key={item.title}
                className="p-2.5 flex gap-2 items-center cursor-pointer rounded-[10px] bg-green-1"
                href={item.path}
              >
                <Image
                  src={`${item.icon}.svg`}
                  alt={item.title}
                  width={24}
                  height={24}
                />
                {isOpen && (
                  <Label className="cursor-pointer font-medium text-white">
                    {item.title}
                  </Label>
                )}
              </Link>
            ) : (
              <Link
                key={item.title}
                className={clsx({
                  "p-2.5 flex gap-2 items-center cursor-pointer": true,
                  "rounded-[10px] bg-green-2": isActive(item.path),
                })}
                href={item.path}
              >
                <Image
                  src={`${
                    isActive(item.path) ? `${item.icon}-green` : item.icon
                  }.svg`}
                  alt={item.title}
                  width={24}
                  height={24}
                />
                {isOpen && (
                  <Label
                    className={clsx({
                      "font-medium cursor-pointer": true,
                      "text-green-1": isActive(item.path),
                    })}
                  >
                    {item.title}
                  </Label>
                )}
              </Link>
            )
          )}
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
  );
}
