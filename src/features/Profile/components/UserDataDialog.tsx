import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { isValidNIK, isValidNPWP } from "@/utils/validation";

import { useUpdateUser } from "../hooks/useProfile";
import type { UserProfile, UserType } from "../types/Profile";

type Props = {
  isOpen: boolean;
  isProfile?: boolean;
  onClose: () => void;
  profile?: UserProfile;
};

export default function UserDataDialog({
  isOpen,
  isProfile = false,
  onClose,
  profile,
}: Props) {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [npwp, setNpwp] = useState("");
  const [userType, setUserType] = useState<UserType>("PERSONAL");

  const isPersonal = userType === "PERSONAL";
  const nikValid = isValidNIK(nik);
  const npwpValid = isValidNPWP(npwp);

  const updateUser = useUpdateUser();

  useEffect(() => {
    if (profile) {
      setUserType(profile.type);
      if (profile.type === "PERSONAL") {
        setName(profile.name || "");
        setNik(profile.nik || "");
      } else {
        setCompanyName(profile.name || "");
        setNpwp(profile.npwp || "");
      }
    }
  }, [profile]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="px-10 py-7 w-[430px]" close={false}>
        <div>
          <Label className="text-2xl text-grey-2 font-semibold">
            Kelengkapan Data
          </Label>

          <RadioGroup
            onValueChange={(value: UserType) => {
              if (value === "PERSONAL") {
                setCompanyName("");
                setNpwp("");
              } else {
                setName("");
                setNik("");
              }
              setUserType(value);
            }}
            defaultValue={"PERSONAL"}
            className="flex flex-col gap-7 my-7"
          >
            <div>
              <div className="flex gap-2.5 items-center mb-4">
                <RadioGroupItem value="PERSONAL" />
                <Label className="text-base text-grey-2 font-semibold">
                  Personal
                </Label>
              </div>

              <div className="flex flex-col gap-4">
                <Label className="text-grey-2">
                  Lengkapi data pribadi Anda{" "}
                </Label>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name" className="text-grey-2">
                    Nama
                  </Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    disabled={!isPersonal}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nik" className="text-grey-2">
                    NIK *
                  </Label>
                  <Input
                    id="nik"
                    placeholder="Masukkan NIK"
                    disabled={!isPersonal}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                  />
                  <Label className="text-red-500 text-xs">
                    {nik !== "" && !nikValid && "NIK tidak valid"}
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2.5 items-center mb-4">
                <RadioGroupItem value="INSTITUSI" />
                <Label className="text-base text-grey-2 font-semibold">
                  Perusahaan / Lembaga
                </Label>
              </div>

              <div className="flex flex-col gap-4">
                <Label className="text-grey-2">
                  Lengkapi data perusahaan Anda{" "}
                </Label>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="companyName" className="text-grey-2">
                    Nama Perusahaan
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Masukkan nama perusahaan / lembaga"
                    disabled={isPersonal}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="npwp" className="text-grey-2">
                    NPWP *
                  </Label>
                  <Input
                    id="npwp"
                    placeholder="Masukkan NPWP"
                    disabled={isPersonal}
                    value={npwp}
                    onChange={(e) => setNpwp(e.target.value)}
                  />
                  <Label className="text-red-500 text-xs">
                    {npwp !== "" && !npwpValid && "NPWP tidak valid"}
                  </Label>
                </div>
              </div>
            </div>
          </RadioGroup>

          <Separator className="mb-4" />

          <Label className="text-grey-2">
            (*) NIK/NPWP sebagai syarat untuk pengurangan pajak nantinya
          </Label>

          <div className="mt-7 flex justify-between gap-7">
            <Button
              variant={"outline"}
              className="flex-1"
              onClick={() => (isProfile ? onClose() : window.location.reload())}
            >
              {isProfile ? "Batal" : "Lewati"}
            </Button>
            <Button
              disabled={
                isPersonal &&
                (!name || !nikValid) &&
                !isPersonal &&
                (!companyName || !npwpValid)
              }
              className="flex-1"
              onClick={() => {
                const payload = {
                  name: isPersonal ? name : companyName,
                  nik: isPersonal ? nik : "",
                  type: userType,
                  npwp: !isPersonal ? npwp : "",
                };
                updateUser.mutate(payload, {
                  onSuccess: (resp) => {
                    if (resp.status === 200) {
                      toast({
                        duration: 500,
                        title: "Berhasil",
                        description: "Data berhasil disimpan",
                      });
                      window.location.reload();
                    } else {
                      throw new Error(resp.data.message);
                    }
                  },
                });
              }}
            >
              Simpan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
