import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProfileLembaga } from "@/features/Lembaga/types";
import useAppContext from "@/utils/context";

import { useFetchLembaga } from "../hooks/useDonation";
import type { IDonationForm } from "../types";
import { DonationType } from "..";

const DonationSchema = z.object({
  lembaga: z.string(),
  amount: z.string().regex(/^\d+$/),
  phone: z.string().regex(/^[2-9]\d{7,11}$/),
});

type DonationSchemaType = z.infer<typeof DonationSchema>;
type Props = {
  toDetail: (data: IDonationForm) => void;
};

export default function InputDonation({ toDetail }: Props) {
  const { profile } = useAppContext();

  const [activeTab, setActiveTab] = useState("1");
  const [open, setOpen] = useState(false);

  const { data: listLembaga, refetch } = useFetchLembaga(activeTab);

  const {
    watch,
    setValue,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationSchemaType>({ resolver: zodResolver(DonationSchema) });

  const namaLembaga = watch("lembaga");
  const selectedLembaga = useMemo(() => {
    return listLembaga?.find(
      (lembaga: IProfileLembaga) => lembaga.nama === namaLembaga
    );
  }, [listLembaga, namaLembaga]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    setValue("phone", profile?.phoneNumber || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const onSubmit: SubmitHandler<DonationSchemaType> = (data) =>
    toDetail({ ...data, donationType: activeTab, selectedLembaga });

  return (
    <Card className="w-full flex flex-col gap-7">
      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={(val: string) => {
          setActiveTab(val);
          setValue("lembaga", "");
        }}
      >
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="1">
            Zakat
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="2">
            Wakaf
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="3">
            Infaq
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-1">
        <Label>Lembaga</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="border-grey-5 text-grey-4 justify-between px-3 text-opacity-100 hover:bg-transparent"
            >
              {selectedLembaga
                ? `${selectedLembaga.nama} - ${selectedLembaga.kode}`
                : `Pilih lembaga penyalur ${DonationType[
                    Number(activeTab)
                  ].toLowerCase()}`}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="popover-content-w-full p-0">
            <Command>
              <CommandInput placeholder="Cari lembaga" />
              <CommandList>
                <CommandEmpty>Lembaga tidak ditemukan</CommandEmpty>
                <CommandGroup>
                  {listLembaga?.map((lembaga) => (
                    <CommandItem
                      key={lembaga.kode}
                      value={lembaga.nama}
                      onSelect={(currentValue: string) => {
                        setValue("lembaga", currentValue);
                        clearErrors("lembaga");
                        setOpen(false);
                      }}
                    >
                      {lembaga.nama} - {lembaga.kode}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.lembaga && (
          <Label className="text-red-500 text-xs">Lembaga harus dipilih</Label>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="nominal">Nominal Pembayaran</Label>
        <Input
          id="nominal"
          leftIcon={
            <Label className="absolute top-3 left-2 text-grey-4">Rp</Label>
          }
          className="!pl-8"
          {...register("amount")}
        />
        {errors.amount && (
          <Label className="text-red-500 text-xs">
            Nominal harus diisi dengan angka
          </Label>
        )}
      </div>

      {!profile?.name && (
        <div className="flex flex-col gap-1">
          <Label htmlFor="phone">No Handphone</Label>
          <Input
            id="phone"
            leftIcon={
              <div className="absolute top-2.5 left-2 text-grey-4 text-sm">
                +62
              </div>
            }
            {...register("phone")}
          />
          {errors.phone && (
            <Label className="text-red-500 text-xs">
              No handphone tidak valid
            </Label>
          )}
        </div>
      )}

      <Button onClick={handleSubmit(onSubmit)}>Tunaikan</Button>
    </Card>
  );
}
