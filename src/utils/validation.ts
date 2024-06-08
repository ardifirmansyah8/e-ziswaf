export const isValidPhone = (phone: string) =>
  new RegExp("^[1-9][0-9]{9,}$").test(phone);

export const isValidNIK = (nik: string) => new RegExp("^\\d{16}$").test(nik);

export const isValidNPWP = (npwp: string) => new RegExp("^\\d{15}$").test(npwp);
