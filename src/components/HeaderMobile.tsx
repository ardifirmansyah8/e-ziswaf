"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MENU } from "@/utils/constant";
import useAppContext from "@/utils/context";
import { getInitials } from "@/utils/string";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export default function HeaderMobile() {
  const pathname = usePathname();

  const { profile, setDialogType } = useAppContext();

  const [open, setOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className={clsx({
          "w-screen h-screen bg-black bg-opacity-50 fixed z-50": open,
        })}
      >
        <div
          className={clsx({
            "transition-all duration-1000 h-dvh fixed z-20 bg-white min-w-[300px] flex flex-col":
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
                <Link
                  key={item.title}
                  className={clsx({
                    "p-2.5 flex gap-2 items-center": true,
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
                  <Label
                    className={clsx({
                      "font-medium cursor-pointer": true,
                      "text-green-1": isActive(item.path),
                    })}
                  >
                    {item.title}
                  </Label>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              {MENU.others.map((item) =>
                item.title === "Tunaikan" ? (
                  <a
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
                    <Label className="font-medium  cursor-pointer text-white">
                      {item.title}
                    </Label>
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    className={clsx({
                      "p-2.5 flex gap-2 items-center": true,
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
                    <Label
                      className={clsx({
                        "font-medium cursor-pointer": true,
                        "text-green-1": isActive(item.path),
                      })}
                    >
                      {item.title}
                    </Label>
                  </Link>
                )
              )}
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
          {profile?.id ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Avatar>
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback>
                        {getInitials(profile.name || "Hamba Allah")}
                      </AvatarFallback>
                    </Avatar>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-2">
                      <li className="p-4 cursor-pointer hover:bg-accent">
                        <NavigationMenuLink asChild href="/profile">
                          <a>Profil</a>
                        </NavigationMenuLink>
                      </li>
                      <li className="p-4 cursor-pointer hover:bg-accent">
                        <NavigationMenuLink asChild>
                          <a
                            onClick={() => {
                              localStorage.removeItem("jwt");
                              window.location.reload();
                            }}
                          >
                            Logout
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <Image
              src="/icon/icon-user.svg"
              alt="icon-user"
              width={24}
              height={24}
              onClick={() => setDialogType("login")}
            />
          )}
        </div>
      </header>
    </>
  );
}
