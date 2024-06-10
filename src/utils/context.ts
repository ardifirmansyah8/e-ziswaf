import { createContext, useContext } from "react";
import type { IUserProfile } from "@/features/Profile/types/Profile";

interface IAppContext {
  isOpen: boolean;
  dialogType: string;
  backTo: string;
  phone: string;
  profile?: IUserProfile;

  setIsOpen: (isOpen: boolean) => void;
  setDialogType: (dialogType: string) => void;
  setBackTo: (dialogType: string) => void;
  setPhone: (dialogType: string) => void;
}

export const AppContext = createContext<IAppContext>({
  isOpen: true,
  dialogType: "",
  backTo: "",
  phone: "",

  setIsOpen: () => {},
  setDialogType: () => {},
  setBackTo: () => {},
  setPhone: () => {},
});

export default function useAppContext() {
  const context = useContext(AppContext);

  return context;
}
