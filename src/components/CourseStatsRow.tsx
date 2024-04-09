import {
  CalendarIcon,
  EyeIcon,
  MessageSquareIcon,
  WalletIcon,
} from "lucide-react";
import CourseStatsValue from "./CourseStatsValue";

type Props = {
  price: string;
  publicatedAt: string;
  rating: number;
  reviews: number;
};

export default function CourseStatsRow({
  price,
  publicatedAt,
  rating,
  reviews,
}: Props) {
  return (
    <div className="grid justify-between grid-cols-2 gap-4 px-6 py-4 bg-gray-100 rounded-lg lg:flex lg:max-w-[60vh]">
      <CourseStatsValue Icon={WalletIcon} text="Price" value={`${price}`} />

      <CourseStatsValue
        Icon={CalendarIcon}
        text="Publication"
        value={publicatedAt}
      />
      <CourseStatsValue Icon={EyeIcon} text="Rating" value={rating} />
      <CourseStatsValue
        Icon={MessageSquareIcon}
        text="Reviews"
        value={reviews}
      />
    </div>
  );
}
