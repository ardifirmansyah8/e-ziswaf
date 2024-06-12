export interface IProfileLembaga {
  active: boolean;
  alamat: string;
  description: string;
  email: string;
  image: string;
  jenis: string;
  kode: number;
  laz: boolean;
  lw: boolean;
  main: boolean;
  nama: string;
  noIzinLaz: string;
  noIzinLw: string;
  noTelp: string;
  tglLahir: string;
  tingkat: string;
  verified: boolean;
  website: string;
}

export interface ILembaga {
  image: string;
  is_verified: string;
  kode: number;
  nama: string;
  tgl_lahir: string;
  total: number;
  trx: number;
}

export interface ILembagaResp {
  data: ILembaga[];
  metadata: {
    page: number;
    totalCount: number;
    totalPage: number;
  };
}
