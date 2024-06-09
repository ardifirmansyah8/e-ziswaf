"use client";

import { ReactNode, useState } from "react";

import { useFetchUserProfile } from "@/features/Profile/hooks/useProfile";
import { AppContext } from "@/utils/context";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [dialogType, setDialogType] = useState("");
  const [backTo, setBackTo] = useState("");
  const [phone, setPhone] = useState("");

  const { data } = useFetchUserProfile();

  return (
    <AppContext.Provider
      value={{
        isOpen,
        dialogType,
        backTo,
        phone,
        profile: data,

        setIsOpen,
        setDialogType,
        setBackTo,
        setPhone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
