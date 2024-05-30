import clsx from "clsx";
import Image from "next/image";

export default function Transactions() {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-2.5">
        <label className="text-sm md:text-base font-semibold text-grey-2">
          Transaksi terakhir di E-Ziswaf
        </label>

        <a className="text-xs md:text-sm text-blue-1 font-medium cursor-pointer">
          Lihat Semua
        </a>
      </div>
      <div className="sm:block md:hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={clsx({
              "p-2.5 flex gap-2.5 items-start": true,
              "bg-grey-3": i % 2 === 0,
              "bg-white": i % 2 !== 0,
            })}
          >
            <Image
              src="/icon/icon-wallet.svg"
              alt="icon-wallet"
              width={24}
              height={24}
            />
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-semibold">TRX 1234567890</label>
              <label className="text-xs">
                dari <b>ID</b> kepada <b>Dompet</b>
              </label>
              <label className="text-xs">1 detik lalu</label>
            </div>
            <label className="text-xs text-green-1 font-semibold">
              Rp50.000.000
            </label>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={clsx({
              "py-2.5 px-4 flex": true,
              "bg-grey-3": i % 2 === 0,
              "bg-white": i % 2 !== 0,
            })}
          >
            <div className="flex items-center gap-4 w-2/3">
              <Image
                src="/icon/icon-wallet.svg"
                alt="icon-wallet"
                width={24}
                height={24}
              />
              <label className="ml-4 text-sm font-semibold">
                TRX 1234567890
              </label>
              <label className="text-sm">1 detik lalu</label>
              <label className="text-sm flex-1">
                dari <b>ID</b> kepada <b>Dompet</b>
              </label>
            </div>
            <div className="w-1/3 flex justify-end">
              <label className="text-sm text-green-1 font-semibold">
                Rp50.000.000
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
