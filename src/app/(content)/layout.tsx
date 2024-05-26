import WrapperMaxWidth from "@/components/WrapperMaxWidth";

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WrapperMaxWidth>{children}</WrapperMaxWidth>;
}
