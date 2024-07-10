"use client";

import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Footer from "../Footer";
import HeaderMobile from "../HeaderMobile";
import OtpDialog from "../OtpDialog";
import Sidebar from "../Sidebar";
import LoginDialog from "@/features/Login/components/LoginDialog";
import UserDataDialog from "@/features/Profile/components/UserDataDialog";
import RegisterDialog from "@/features/Register/components/RegisterDialog";
import SuccessRegisterDialog from "@/features/Register/components/SuccessRegisterDialog";
import useAppContext from "@/utils/context";
import { getInitials } from "@/utils/string";

import { useFetchNotifications, useUpdateStatus } from "./useNotifications";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();

  const [jwt, setJwt] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

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

  const { data } = useFetchNotifications();
  const { mutateAsync } = useUpdateStatus();

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
                <>
                  <Popover
                    open={openNotification}
                    onOpenChange={setOpenNotification}
                  >
                    <PopoverTrigger className="relative">
                      <Image
                        src="/icon/icon-bell.svg"
                        alt="icon-bell"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                      />
                      {data && data?.length > 0 && (
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600 absolute right-0 top-2" />
                      )}
                    </PopoverTrigger>
                    <PopoverContent className="p-4 pt-5 w-[350px]">
                      <div className="flex justify-between mb-5">
                        <Label className="text-base font-semibold">
                          Pemberitahuan Bukti Transaksi
                        </Label>
                      </div>
                      <Command>
                        <CommandList>
                          <CommandGroup className="p-0">
                            {data && data?.length === 0 && (
                              <CommandItem className="p-0 text-center !bg-white">
                                <Label>Belum ada notifikasi baru</Label>
                              </CommandItem>
                            )}
                            {data &&
                              data?.length > 0 &&
                              data?.map((item, i) => (
                                <CommandItem
                                  key={item.id}
                                  className={clsx({
                                    "cursor-pointer py-4 flex gap-2.5": true,
                                    "bg-grey-3": i % 2 === 0,
                                  })}
                                  onSelect={(_) => {
                                    mutateAsync(item.id).then((_) => {
                                      setOpenNotification(false);
                                      window.open(
                                        "/profile?trx_id=" + item.trx_id,
                                        "_self"
                                      );
                                    });
                                  }}
                                >
                                  <Image
                                    src="/icon/icon-wallet.svg"
                                    alt="icon-wallet"
                                    width={24}
                                    height={24}
                                  />
                                  <div className="flex flex-col">
                                    <Label className="text-xs font-semibold">
                                      TRX {item.trx_id.slice(0, 8)}
                                    </Label>
                                    <Label className="text-xs font-semibold">
                                      {format(
                                        new Date(item.tanggal),
                                        "dd MMMM yyyy"
                                      )}
                                    </Label>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Popover open={openMenu} onOpenChange={setOpenMenu}>
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
                                setOpenMenu(false);
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
                </>
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
