import { Loader2Icon } from "lucide-react";

type Props = {
  isLoading: boolean;
};

export default function IconLoader({ isLoading }: Props) {
  if (!isLoading) return null;

  return <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />;
}
