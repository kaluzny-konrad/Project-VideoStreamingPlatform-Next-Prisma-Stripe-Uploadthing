import {
  CalendarIcon,
  EyeIcon,
  MessageSquareIcon,
  WalletIcon,
} from "lucide-react";
import CourseStatsValue from "./CourseStatsValue";
import { Decimal } from "@prisma/client/runtime/library";
import { formatTimeToNow } from "@/lib/utils";

type Props = {
  price: Decimal;
  publicatedAt: Date;
  rating: number;
  reviewsCount: number;
};

export default function CourseStatsRow({
  price,
  publicatedAt,
  rating,
  reviewsCount,
}: Props) {
  return (
    <div className="grid justify-between grid-cols-2 gap-6 p-6 bg-gray-100 rounded-lg">
      <CourseStatsValue Icon={WalletIcon} text="Price" value={`${price}`} />

      <CourseStatsValue
        Icon={CalendarIcon}
        text="Publication"
        value={formatTimeToNow(publicatedAt)}
      />
      <CourseStatsValue Icon={EyeIcon} text="Rating" value={rating} />
      <CourseStatsValue
        Icon={MessageSquareIcon}
        text="Reviews"
        value={reviewsCount}
      />
    </div>
  );
}
