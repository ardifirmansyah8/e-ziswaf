import { IProfileLembaga } from "@/features/Lembaga/types";

export interface IPaymentFee {
  paymentImage: string;
  paymentMethod: string;
  paymentName: string;
  totalFee: string;
  type: "va" | "qris" | "retail" | "ewallet" | "other";
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

export interface IDonationPayload {
  paymentAmount: number;
  paymentMethod: string;
  productDetails: string;
  customerVaName: string;
  email: string;
  phoneNumber: string;
  itemDetails: {
    name: string;
    price: number;
    quantity: number;
  }[];
  customerDetail: {
    firstName: string;
    lastName: string | null;
    email: string | null;
    phoneNumber: string;
  };
  callbackUrl: string;
  expiryPeriod: number;
}
