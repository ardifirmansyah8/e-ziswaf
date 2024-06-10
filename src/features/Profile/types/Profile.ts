import { IChart, IDashboard, ILastTrx } from "@/api/useLandingPage";

export interface IUserProfile {
  id: string;
  name?: string;
  nik?: string;
  npwp?: string;
  phoneNumber: string;
  email: string;
  type: UserType;
  activated: boolean;
}

export type UserType = "PERSONAL" | "INSTITUSI";

export interface IUserPayload {
  name: string;
  type: UserType;
  nik?: string;
  npwp?: string;
}

export interface IUserDashboard {
  dashboard: IDashboard;
  chart: IChart[];
  lastTrx: ILastTrx[];
}

export interface IUserTrx {
  tanggal: string;
  amount: string;
  trx_no: string;
  to: string;
}

export interface IUserTrxResponse {
  data: IUserTrx[];
  metadata: {
    page: number;
    totalCount: number;
    totalPage: number;
  };
}
