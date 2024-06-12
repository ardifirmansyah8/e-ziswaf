import DetailLembaga from "@/features/Lembaga/detail";

export default function Page({ params }: { params: { code: string } }) {
  return <DetailLembaga code={params.code} />;
}
