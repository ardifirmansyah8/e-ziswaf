import { IChart, IDashboard, ILastTrx } from "@/api/useLandingPage";

export interface UserProfile {
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

export interface UserPayload {
  name: string;
  type: UserType;
  nik?: string;
  npwp?: string;
}

export interface UserDashboard {
  dashboard: IDashboard;
  chart: IChart[];
  lastTrx: ILastTrx[];
}
