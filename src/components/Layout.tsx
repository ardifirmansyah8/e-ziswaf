"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Footer from "@/components/Footer";
import HeaderMobile from "@/components/HeaderMobile";
import Sidebar from "@/components/Sidebar";
import LoginDialog from "@/features/Login/components/LoginDialog";
import UserDataDialog from "@/features/Profile/components/UserDataDialog";
import RegisterDialog from "@/features/Register/components/RegisterDialog";
import SuccessRegisterDialog from "@/features/Register/components/SuccessRegisterDialog";
import OtpDialog from "./OtpDialog";
import useAppContext from "@/utils/context";
import { getInitials } from "@/utils/string";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();

  const {
    isOpen,
    dialogType,
    backTo,
    phone,
    profile,
    setIsOpen,
    setDialogType,
    setBackTo,
    setPhone,
  } = useAppContext();

  return (
    <div className="bg-white md:flex md:flex-col md:items-center gap-5">
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
              {!profile?.id ? (
                <div className="flex gap-2.5">
                  <Button onClick={() => setDialogType("login")}>Masuk</Button>
                  <Button
                    variant={"outline"}
                    onClick={() => setDialogType("register")}
                  >
                    Daftar
                  </Button>
                </div>
              ) : (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <div className="flex items-center gap-1">
                          {profile.name || "Hamba Allah"}
                          <Avatar>
                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                            <AvatarFallback>
                              {getInitials(profile.name || "Hamba Allah")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex flex-col gap-2 w-[185px]">
                          <li className="p-4 cursor-pointer hover:bg-accent">
                            <NavigationMenuLink asChild href="/profile">
                              <a>Profil</a>
                            </NavigationMenuLink>
                          </li>
                          <li className="p-4 cursor-pointer hover:bg-accent">
                            <NavigationMenuLink asChild>
                              <a
                                onClick={() => {
                                  window.localStorage.removeItem("jwt");
                                  router.push("/");
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
              )}
            </div>

            {children}
          </section>
        </main>
      </div>
      <Footer isOpen={isOpen} />

      <LoginDialog
        isOpen={dialogType === "login"}
        onClose={(type) => setDialogType(type || "")}
        onSubmit={(type: string, phone: string) => {
          setBackTo("login");
          setPhone(phone);
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
        onClose={() => {
          setDialogType("success-register");
        }}
      />

      <SuccessRegisterDialog isOpen={dialogType === "success-register"} />
    </div>
  );
}
