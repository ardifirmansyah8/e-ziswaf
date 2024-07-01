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
  2: "Wakaf",
  3: "Infaq",
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
      const parseMethods = resp.data.paymentFee.reduce(
        (result: IPaymentMethod[], curr: IPaymentFee) => {
          if (curr.paymentName.search(/VA/i) !== -1) {
            const vaIndex = result.findIndex((method) => method.type === "va");
            if (vaIndex > -1) {
              result[vaIndex].method = [...result[vaIndex].method, curr];
            } else {
              result.push({ type: "va", method: [curr] });
            }
          } else if (curr.paymentName.search(/QRIS/i) !== -1) {
            const qrisIndex = result.findIndex(
              (method) => method.type === "qris"
            );
            if (qrisIndex > -1) {
              result[qrisIndex].method = [...result[qrisIndex].method, curr];
            } else {
              result.push({ type: "qris", method: [curr] });
            }
          } else if (curr.paymentName === "RETAIL") {
            result.push({ type: "retail", method: [curr] });
          } else if (
            curr.paymentName === "DANA" ||
            curr.paymentName === "LINKAJA APP PCT"
          ) {
            const ewalletIndex = result.findIndex(
              (method) => method.type === "ewallet"
            );
            if (ewalletIndex > -1) {
              result[ewalletIndex].method = [
                ...result[ewalletIndex].method,
                curr,
              ];
            } else {
              result.push({ type: "ewallet", method: [curr] });
            }
          }
          return result;
        },
        []
      );
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
        height={317}
        sizes="100%"
        className="w-full mb-5"
      />

      <div className="flex flex-col items-center gap-10 px-[176px]">
        <Label className="text-2xl">
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
