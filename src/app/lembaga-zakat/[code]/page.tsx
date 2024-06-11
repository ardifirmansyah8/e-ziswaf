import DetailLembaga from "@/features/DetailLembaga";

export default function Page({ params }: { params: { code: string } }) {
  return <DetailLembaga code={params.code} />;
}
