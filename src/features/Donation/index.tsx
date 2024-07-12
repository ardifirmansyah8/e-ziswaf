"use client";

import Image from "next/image";
import { useState } from "react";

import { Label } from "@/components/ui/label";

import InputDonation from "./components/InputDonation";
import { usePaymentMethods } from "./hooks/useDonation";
import type { IDonationForm, IPaymentMethod, IPaymentFee } from "./types";
import DetailDonation from "./components/DetailDonation";

export const DonationType: { [key: number]: string } = {
  1: "Zakat",
  2: "Infak/Sedekah",
  3: "Wakaf",
};

export default function Donation() {
  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState<IDonationForm | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);

  const { mutateAsync } = usePaymentMethods();

  const goToDetail = async (data: IDonationForm) => {
    setPayload(data);
    const resp = await mutateAsync(data.amount);
    if (resp.data.paymentFee) {
      const parseMethods = [
        { type: "va", method: [] },
        { type: "qris", method: [] },
        { type: "ewallet", method: [] },
        { type: "retail", method: [] },
        { type: "other", method: [] },
      ] as IPaymentMethod[];
      resp.data.paymentFee.forEach((method: IPaymentFee) => {
        if (method.type === "va") {
          parseMethods[0].method = [...parseMethods[0].method, method];
        } else if (method.type === "qris") {
          parseMethods[1].method = [...parseMethods[1].method, method];
        } else if (method.type === "ewallet") {
          parseMethods[2].method = [...parseMethods[2].method, method];
        } else if (method.type === "retail") {
          parseMethods[3].method = [...parseMethods[3].method, method];
        } else if (method.type === "other") {
          parseMethods[4].method = [...parseMethods[4].method, method];
        }
      });
      setPaymentMethods(parseMethods);
      setStep(2);
    }
  };

  return (
    <>
      {/* Banner */}
      <Image
        src="/banner-donation.png"
        alt="banner-donation"
        width="0"
        height="0"
        sizes="100%"
        className="w-full h-[125px] md:h-[200px] md:mb-5 rounded-lg"
      />

      <div className="flex flex-col items-center gap-4 md:gap-10 md:px-[176px]">
        <Label className="text-base md:text-2xl font-semibold w-[229px] md:w-full text-center md:text-left">
          Tunaikan Segala Donasi Anda Bersama Kami
        </Label>
        {step === 1 && <InputDonation toDetail={goToDetail} />}

        {step === 2 && (
          <DetailDonation
            onBack={() => setStep(1)}
            payload={payload}
            paymentMethods={paymentMethods}
          />
        )}
      </div>
    </>
  );
}
