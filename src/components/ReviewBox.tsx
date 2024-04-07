import { Review, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  review: Review;
  user: User;
};

export default function ReviewBox({ review, user }: Props) {
  return (
    <div className="flex gap-2 p-2 my-4 items-center">
      <Avatar className="mr-4">
        <AvatarImage src={user.image || ""} alt={user.name || ""} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-gray-900">Recenzja: {review.title}</p>
          <p>Ocena: {review.rating}/5</p>
        </div>
        <p>Komentarz: {review.comment}</p>
      </div>
    </div>
  );
}
