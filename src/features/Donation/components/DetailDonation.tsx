import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Card from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { delimiter } from "@/utils/string";
import { DonationType } from "..";

import type { IDonationForm, IPaymentMethod } from "../types";
import { Button } from "@/components/ui/button";

const PaymentType: { [key: string]: string } = {
  va: "Transfer Bank (Virtual Account)",
  qris: "QRIS",
  retail: "Setor Tunai",
  ewallet: "E-Wallet",
};

type Props = {
  onBack: () => void;
  payload: IDonationForm | null;
  paymentMethods: IPaymentMethod[];
};

export default function DetailDonation({
  onBack,
  payload,
  paymentMethods,
}: Props) {
  const [selectedMethod, setSelectedMethod] = useState("");

  return (
    <Card className="w-full flex flex-col gap-7">
      <Label className="flex items-center gap-4 text-base font-semibold">
        <ArrowLeft className="cursor-pointer" onClick={() => onBack()} />
        Detail Pembayaran
      </Label>

      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <Label className="w-36 text-grey-4">Jenis Pembayaran</Label>
          <Label>:</Label>
          <Label className="font-semibold">
            {DonationType[Number(payload?.donationType)]}
          </Label>
        </div>
        <div className="flex gap-2.5">
          <Label className="w-36 text-grey-4">Lembaga</Label>
          <Label>:</Label>
          <Label className="font-semibold">{`${payload?.selectedLembaga?.kode} - ${payload?.selectedLembaga?.nama}`}</Label>
        </div>
        <div className="flex gap-2.5">
          <Label className="w-36 text-grey-4">Nominal</Label>
          <Label>:</Label>
          <Label className="text-green-1 font-semibold">
            Rp. {delimiter(Number(payload?.amount))}
          </Label>
        </div>
        <div className="flex gap-2.5">
          <Label className="w-36 text-grey-4">No. Handphone</Label>
          <Label>:</Label>
          <Label className="font-semibold">+62{payload?.phone}</Label>
        </div>
      </div>

      <div className="bg-green-2 px-5 py-4 flex flex-col gap-1 rounded-[10px]">
        <Label className="text-green-1 text-xs font-medium">
          Doa {DonationType[Number(payload?.donationType)]}
        </Label>
        <Label className="font-semibold leading-5">
          Nawaitu an ukhrija zakaatal fithri 'anni wa 'an jamii'i ma yalzamunii
          nafaqaatuhum syar'an fardhan lillaahi ta'aalaa
        </Label>
      </div>

      <Separator />

      <div>
        <Label className="text-grey-4 font-semibold">Metode Pembayaran</Label>

        <div className="flex flex-col gap-2.5 mt-5">
          {paymentMethods.map((payment) => (
            <Accordion
              key={payment.type}
              type="single"
              collapsible
              className="border border-grey-5 rounded-sm p-2.5"
            >
              <AccordionItem value={payment.type}>
                <AccordionTrigger>{PaymentType[payment.type]}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2.5">
                  {payment.method.map((method) => (
                    <div
                      key={method.paymentMethod}
                      className="flex items-center justify-between bg-blue-2 p-2.5 rounded-sm cursor-pointer"
                      onClick={() => setSelectedMethod(method.paymentMethod)}
                    >
                      <div className="flex items-center gap-2.5">
                        <Image
                          src={method.paymentImage}
                          alt={method.paymentMethod}
                          width={50}
                          height={20}
                        />
                        <Label>{method.paymentName}</Label>
                      </div>
                      {selectedMethod === method.paymentMethod && (
                        <Check className="h-4 w-4 text-green-1 font-bold" />
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      <Button>Bayar</Button>
    </Card>
  );
}
