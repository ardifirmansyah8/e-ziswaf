import clsx from "clsx";
import Image from "next/image";

export default function Transactions() {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-2.5">
        <label className="text-sm font-semibold text-grey-2">
          Transaksi terakhir di E-Ziswaf
        </label>

        <a className="text-xs text-blue-1 font-medium cursor-pointer">
          Lihat Semua
        </a>
      </div>
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
  );
}
