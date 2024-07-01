"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Footer from "@/components/Footer";
import HeaderMobile from "@/components/HeaderMobile";
import Sidebar from "@/components/Sidebar";
import LoginDialog from "@/features/Login/components/LoginDialog";
import UserDataDialog from "@/features/Profile/components/UserDataDialog";
import RegisterDialog from "@/features/Register/components/RegisterDialog";
import SuccessRegisterDialog from "@/features/Register/components/SuccessRegisterDialog";
import useAppContext from "@/utils/context";
import { getInitials } from "@/utils/string";
import OtpDialog from "./OtpDialog";
import { ChevronDown } from "lucide-react";
import { set } from "date-fns";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();

  const [jwt, setJwt] = useState("");
  const [open, setOpen] = useState(false);

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
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 hover:bg-white"
                    >
                      {profile.name || "Hamba Allah"}
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(profile.name || "Hamba Allah")}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-40">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            className="cursor-pointer py-4"
                            onSelect={(_) => {
                              router.push("/profile");
                              setOpen(false);
                            }}
                          >
                            Profil
                          </CommandItem>
                          <CommandItem
                            className="cursor-pointer py-4"
                            onSelect={(_) => {
                              localStorage.removeItem("jwt");
                              window.location.reload();
                            }}
                          >
                            Logout
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
        onSubmit={(jwt: string) => {
          if (backTo === "login") {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            setDialogType("user-data");
            setJwt(jwt);
          }
        }}
      />

      <UserDataDialog
        isOpen={dialogType === "user-data"}
        onClose={() => {
          setDialogType("success-register");
        }}
        jwt={jwt}
      />

      <SuccessRegisterDialog isOpen={dialogType === "success-register"} />
    </div>
  );
}
