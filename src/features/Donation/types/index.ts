import { IProfileLembaga } from "@/features/Lembaga/types";

export interface IPaymentFee {
  paymentImage: string;
  paymentMethod: string;
  paymentName: string;
  totalFee: string;
}

export interface IPaymentMethod {
  type: string;
  method: IPaymentFee[];
}

export interface IDonationForm {
  donationType: string;
  lembaga: string;
  amount: string;
  phone: string;
  selectedLembaga: IProfileLembaga | undefined;
}
