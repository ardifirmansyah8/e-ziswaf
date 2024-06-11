import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ className, children }: Props) {
  return (
    <div
      className={cn(
        "border border-grey-1 rounded-[10px] p-7 bg-white",
        className
      )}
      style={{ boxShadow: "0px 2px 20px 0px #0000001A" }}
    >
      {children}
    </div>
  );
}
