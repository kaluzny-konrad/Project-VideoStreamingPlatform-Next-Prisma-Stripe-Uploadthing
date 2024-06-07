import WrapperMaxWidth from "@/components/shared/WrapperMaxWidth";

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WrapperMaxWidth>{children}</WrapperMaxWidth>;
}
