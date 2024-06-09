type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      className="border border-grey-1 rounded-[10px] p-7 w-full bg-white"
      style={{ boxShadow: "0px 2px 20px 0px #0000001A" }}
    >
      {children}
    </div>
  );
}
