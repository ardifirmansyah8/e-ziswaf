import { cn } from "@/utils/tailwind";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Card({ className, children, style }: Props) {
  return (
    <div
      className={cn(
        "border border-grey-1 rounded-[10px] p-7 bg-white",
        className
      )}
      style={{ boxShadow: "0px 2px 20px 0px #0000001A", ...style }}
    >
      {children}
    </div>
  );
}
