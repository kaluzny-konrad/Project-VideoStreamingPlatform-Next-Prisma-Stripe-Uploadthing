import { Review, User } from "@prisma/client";
import UserInfoBox from "./UserInfoBox";

type PartialUser = Pick<User, "name" | "image">;

type Props = {
  review: Review;
  user: PartialUser;
};

export default function ReviewBox({ review, user }: Props) {
  return (
    <div className="flex flex-col w-full gap-6 my-2 lg:flex-row">

      <UserInfoBox user={user} />

      <div className="flex flex-col gap-2 text-left">
        <p className="font-bold text-gray-900">
          {review.rating}/5 - {review.title}
        </p>
        <p className="text-sm text-gray-700">{review.comment}</p>
      </div>
    </div>
  );
}
